import React from "react";
import ReservationList from "@/views/reservationList/ReservationList";

export default async function Home() {
  return (
    <React.Fragment>
      <ReservationList />
    </React.Fragment>
  );
}
