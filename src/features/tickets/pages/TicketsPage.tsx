import { TicketList } from '@/features/tickets/components/TicketList';
import { CsvUpload } from '@/features/tickets/components/CsvUpload';

interface TicketsPageProps {
  mode?: 'my-tickets' | 'all-tickets';
}

export const TicketsPage = ({ mode = 'my-tickets' }: TicketsPageProps) => {
  return (
    <>
      <div className="border-bottom bg-white px-4 py-3">
        <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center">
          <div className="fw-semibold">
            {mode === 'all-tickets' ? 'All Tickets' : 'Tickets'}
          </div>
          <div>
            <CsvUpload />
          </div>
        </div>
      </div>
      <TicketList mode={mode} />
    </>
  );
};
