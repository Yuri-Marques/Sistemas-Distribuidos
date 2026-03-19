from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from fastapi import FastAPI, HTTPException, Header, Depends
from typing import Annotated

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

SUPABASE_URL = ""  # Utilizar as credenciais de sua conta do Supabase
SUPABASE_KEY = ""  # Utilizar as credenciais de sua conta do Supabase
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


class Reserva(BaseModel):
    assento_id: str
    email: str


class UserAuth(BaseModel):
    email: str
    password: str


def get_current_user(authorization: Annotated[str | None, Header()] = None):
    if not authorization:
        raise HTTPException(status_code=401, detail="Token ausente")
    try:
        token = authorization.replace("Bearer ", "")
        user = supabase.auth.get_user(token)
        return user.user
    except Exception:
        raise HTTPException(status_code=401, detail="Sessão inválida")


@app.post("/auth/login")
async def login(user_data: UserAuth):
    try:
        response = supabase.auth.sign_in_with_password({
            "email": user_data.email,
            "password": user_data.password
        })
        return {
            "token": response.session.access_token,
            "email": response.user.email
        }
    except Exception:
        raise HTTPException(
            status_code=401, detail="Credenciais inválidas ou usuário não existe.")


@app.get("/assentos")
def listar_assentos():
    try:
        response = supabase.table("seats") \
            .select("*") \
            .order("seat_number") \
            .execute()
        return response.data
    except Exception as e:
        print(f"ERRO AO LISTAR: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/reservar")
def reservar_assento(reserva: Reserva, user: Annotated[any, Depends(get_current_user)]):
    try:
        check = supabase.table("seats").select("status").eq(
            "seat_number", reserva.assento_id).execute()

        if not check.data:
            raise HTTPException(
                status_code=404, detail="Assento não encontrado")

        if check.data[0]['status'] == 'ocupado':
            raise HTTPException(status_code=400, detail="Assento já ocupado")

        response = supabase.table("seats").update({
            "status": "ocupado",
            "user_id": user.email
        }).eq("seat_number", reserva.assento_id).execute()

        return response.data
    except Exception as e:
        print(f"ERRO AO RESERVAR: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/cancelar")
def cancelar_reserva(reserva: Reserva, user: Annotated[any, Depends(get_current_user)]):
    try:
        response = supabase.table("seats").update({
            "status": "disponivel",
            "user_id": None
        }).eq("seat_number", reserva.assento_id).eq("user_id", user.email).execute()

        return response.data
    except Exception as e:
        print(f"ERRO AO CANCELAR: {e}")
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
