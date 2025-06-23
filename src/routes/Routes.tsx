import { Route, Routes } from "react-router-dom";
import { Landing } from "@/components/landingPage/LandingComp";
import Trades from "@/components/trades/Trades";
import Bids from "@/components/bids/Bids";
import Teams from '../components/teams/Teams';
import Projects from "@/components/projects/Projects";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/trades" element={<Trades />} />
      <Route path="/bids/:tradeId" element={<Bids />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/projects" element={<Projects />} />
    </Routes>
  );
};

