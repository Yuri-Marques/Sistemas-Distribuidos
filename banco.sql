create table public.seats (
  id uuid not null default extensions.uuid_generate_v4 (),
  seat_number text not null,
  status text null default 'disponivel'::text,
  category text null,
  user_id text null,
  constraint seats_pkey primary key (id)
) TABLESPACE pg_default;

insert into seats (id, status, category) values
('A1', 'disponivel', 'VIP'), ('A2', 'disponivel', 'VIP'), ('A3', 'disponivel', 'VIP'), ('A4', 'disponivel', 'VIP'), ('A5', 'disponivel', 'VIP'),
('B1', 'disponivel', 'VIP'), ('B2', 'disponivel', 'VIP'), ('B3', 'disponivel', 'VIP'), ('B4', 'disponivel', 'VIP'), ('B5', 'disponivel', 'VIP'),
('C1', 'disponivel', 'VIP'), ('C2', 'disponivel', 'VIP'), ('C3', 'disponivel', 'VIP'), ('C4', 'disponivel', 'VIP'), ('C5', 'disponivel', 'VIP'),
('D1', 'disponivel', 'Normal'), ('D2', 'disponivel', 'Normal'), ('D3', 'disponivel', 'Normal'), ('D4', 'disponivel', 'Normal'), ('D5', 'disponivel', 'Normal'),
('E1', 'disponivel', 'Normal'), ('E2', 'disponivel', 'Normal'), ('E3', 'disponivel', 'Normal'), ('E4', 'disponivel', 'Normal'), ('E5', 'disponivel', 'Normal'),
('F1', 'disponivel', 'Normal'), ('F2', 'disponivel', 'Normal'), ('F3', 'disponivel', 'Normal'), ('F4', 'disponivel', 'Normal'), ('F5', 'disponivel', 'Normal'),
('G1', 'disponivel', 'Normal'), ('G2', 'disponivel', 'Normal'), ('G3', 'disponivel', 'Normal'), ('G4', 'disponivel', 'Normal'), ('G5', 'disponivel', 'Normal'),
('H1', 'disponivel', 'Normal'), ('H2', 'disponivel', 'Normal'), ('H3', 'disponivel', 'Normal'), ('H4', 'disponivel', 'Normal'), ('H5', 'disponivel', 'Normal');
