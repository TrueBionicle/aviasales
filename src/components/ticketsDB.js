const TicketsDB = (data) => {
  return data.map((item) => {
    return {
      price: item.price,
      logo: item.carrier,
      segment1: {
        origin: item.segments[0].origin,
        destination: item.segments[0].destination,
        durationHours: Math.floor(item.segments[0].duration / 60),
        durationMinutes: item.segments[0].duration % 60,
        stops: {
          count: item.segments[0].stops.length,
          name: (() => {
            let result = "";
            item.segments[0].stops.map((item) => (result += `${item} `));
            return result;
          })(),
        },
        date: {
          hours: new Date(item.segments[1].date).getHours(),
          minutes: new Date(item.segments[1].date).getMinutes(),
        },
      },
      segment2: {
        origin: item.segments[1].origin,
        destination: item.segments[1].destination,
        durationHours: Math.floor(item.segments[1].duration / 60),
        durationMinutes: item.segments[1].duration % 60,
        stops: {
          count: item.segments[1].stops.length,
          name: (() => {
            let result = "";
            item.segments[1].stops.map((item) => (result += `${item} `));
            return result;
          })(),
        },
        date: {
          hours: new Date(item.segments[1].date).getHours(),
          minutes: new Date(item.segments[1].date).getMinutes(),
        },
      },
    };
  });
};

export default TicketsDB;
