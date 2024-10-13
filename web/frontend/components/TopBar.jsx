import React from 'react';
import { NavLink } from 'react-router-dom';
import { useQuery } from "react-query";
export const TopBar = () => {
  const {
    data
  } = useQuery({
    queryKey: ["storeName"],
    queryFn: async () => {
      const response = await fetch("/api/store/info");
      return await response.json();
    }
  });
  return (
    <div className='topbar-section'>
      <div className='logo-block'>
        <img className='logo' src="../assets/home-trophy.png" alt="logo image" />
        <h1 className='text-bold h4'>{data?.data[0]?.name}</h1>
        <NavLink to="/">Sales</NavLink>
        <NavLink to="/products">Products</NavLink>
      </div>
    </div>
  );
};
