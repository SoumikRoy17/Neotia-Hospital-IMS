import pool from "../config/db.js";

const createTicketTable = async () => {
    const queryText = `
        CREATE TABLE IF NOT EXISTS tickets (
            id UUID PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            category TEXT CHECK (category IN ('Technical Issue','Software Request','Access Request','Equipment Issue','Other')) NOT NULL,
            priority TEXT CHECK (priority IN ('Low','Medium','High','Critical')) NOT NULL,
            status TEXT CHECK (status IN ('Open','In Progress','Pending','Resolved','Closed')) NOT NULL DEFAULT 'Open',
            assigned_to UUID REFERENCES testuser(id),
            created_by UUID REFERENCES testuser(id) NOT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            resolved_at TIMESTAMPTZ,
            department TEXT NOT NULL,
            attachments TEXT[]
        );

        CREATE TABLE IF NOT EXISTS ticket_comments (
            id UUID PRIMARY KEY,
            ticket_id UUID REFERENCES tickets(id) ON DELETE CASCADE,
            author UUID REFERENCES testuser(id),
            content TEXT NOT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            is_internal BOOLEAN NOT NULL DEFAULT FALSE
            );
        `;

    try {
        pool.query(queryText);
        console.log("Ticket table created if not exists");
    } catch (error) {
        console.log("Error creating Tickets table : ", error);
    }
};

export default createTicketTable;