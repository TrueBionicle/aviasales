const filterTicketByTransfer = (
  ticket,
  showAllTickets,
  valueFilterTransfer
) => {
  if (!showAllTickets) {
    return (
      valueFilterTransfer.includes(ticket.segments[0].stops.length) ||
      valueFilterTransfer.includes(ticket.segments[1].stops.length)
    );
  }
  return true;
};
export default filterTicketByTransfer;
