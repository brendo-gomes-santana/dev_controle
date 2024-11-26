export interface TicketProps {
    id: string;
    name: string;
    address: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    userId: string | null;
    phone: string;
    email: string;
    status: string;
    description: string;
}