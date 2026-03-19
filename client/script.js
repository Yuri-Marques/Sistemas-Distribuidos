const API_URL = "http://localhost:8000";

const authScreen = document.getElementById('auth-screen');
const seatsScreen = document.getElementById('seats-screen');
const loginForm = document.getElementById('login-form');
const welcomeMessage = document.getElementById('welcome-message');
const errorMessage = document.getElementById('error-message');
const seatsMap = document.getElementById('seats-map');

function showScreen(screenId) {
    if (screenId === 'auth') {
        authScreen.classList.replace('hidden', 'show');
        seatsScreen.classList.replace('show', 'hidden');
    } else {
        authScreen.classList.replace('show', 'hidden');
        seatsScreen.classList.replace('hidden', 'show');
    }
}

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email-login').value;
    const password = document.getElementById('password-login').value;

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('cinema_user_email', data.email);
            localStorage.setItem('cinema_user_token', data.token);
            checkAuth();
        } else {
            errorMessage.textContent = data.detail || 'Falha no login.';
            errorMessage.classList.remove('hidden');
        }
    } catch (error) {
        errorMessage.textContent = 'Erro ao conectar ao servidor.';
        errorMessage.classList.remove('hidden');
    }
});

function logout() {
    localStorage.removeItem('cinema_user_email');
    localStorage.removeItem('cinema_user_token');
    showScreen('auth');
}

function checkAuth() {
    const userEmail = localStorage.getItem('cinema_user_email');
    if (userEmail) {
        welcomeMessage.innerHTML = `Bem-vindo, <strong>${userEmail}</strong>`;
        showScreen('seats');
        loadSeats();
    } else {
        showScreen('auth');
    }
}

async function loadSeats() {
    try {
        const response = await fetch(`${API_URL}/assentos`);
        const seats = await response.json();
        renderSeatsMap(seats);
    } catch (error) {
        seatsMap.innerHTML = '<p>Erro ao carregar mapa de assentos.</p>';
    }
}

function renderSeatsMap(seats) {
    seatsMap.innerHTML = '';
    const userEmail = localStorage.getItem('cinema_user_email');

    seats.forEach(seat => {
        const seatDiv = document.createElement('div');
        
        const status = seat.status || 'disponivel';
        const categoria = (seat.category || 'Normal').toLowerCase();
        
        seatDiv.className = `seat ${status} ${categoria}`;
        
        seatDiv.innerHTML = `<div class="seat-id">${seat.seat_number}</div>`;

        const button = document.createElement('button');
        if (status === 'disponivel') {
            button.textContent = 'Reservar';
            button.onclick = () => reserveSeat(seat.seat_number);
        } else if (status === 'ocupado') {
            if (seat.user_id === userEmail) {
                button.textContent = 'Cancelar';
                button.classList.add('btn-cancel');
                button.onclick = () => cancelReservation(seat.seat_number);
            } else {
                button.style.visibility = 'hidden'; 
            }
        }
        
        seatDiv.appendChild(button);
        seatsMap.appendChild(seatDiv);
    });
}

async function reserveSeat(seatNumber) {
    const userEmail = localStorage.getItem('cinema_user_email');
    const token = localStorage.getItem('cinema_user_token');

    try {
        const response = await fetch(`${API_URL}/reservar`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ assento_id: seatNumber, email: userEmail })
        });

        if (response.ok) {
            alert(`Assento ${seatNumber} reservado!`);
            loadSeats();
        } else {
            const err = await response.json();
            alert(err.detail || "Erro ao reservar.");
        }
    } catch (error) {
        alert("Erro na conexão.");
    }
}

async function cancelReservation(seatNumber) {
    const userEmail = localStorage.getItem('cinema_user_email');
    const token = localStorage.getItem('cinema_user_token');

    if (!confirm(`Deseja cancelar a reserva do assento ${seatNumber}?`)) return;

    try {
        const response = await fetch(`${API_URL}/cancelar`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ assento_id: seatNumber, email: userEmail })
        });

        if (response.ok) {
            alert(`Reserva ${seatNumber} cancelada.`);
            loadSeats();
        } else {
            alert("Erro ao cancelar.");
        }
    } catch (error) {
        alert("Erro na conexão.");
    }
}

checkAuth();