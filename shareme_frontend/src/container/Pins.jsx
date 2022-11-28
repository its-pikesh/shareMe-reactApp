import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
  CreatePin,
  Feed,
  Login,
  Navbar,
  PinDetail,
  Search,
} from "../components";

const Pins = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <Navbar searchTerm={searchTerm} setSearchTerm></Navbar>
      </div>
      <div className="h-ful">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route path="/pin-detail" element={<PinDetail user={user} />} />
          <Route path="/create-pin" element={<Feed user={user} />} />
          <Route
            path="/search"
            element={
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Pins;
