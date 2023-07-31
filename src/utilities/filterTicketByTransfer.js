const filterTicketByTransfer = (
  ticket,
  showAllTickets,
  valueFilterTransfer
) => {
  if (!showAllTickets) {
    return (
      valueFilterTransfer.includes(ticket.segment1.stops.count) ||
      valueFilterTransfer.includes(ticket.segment2.stops.count)
    );
  }
  return true;
};
export default filterTicketByTransfer;
