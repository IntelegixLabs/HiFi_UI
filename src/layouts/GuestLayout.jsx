import React from 'react';
import { Outlet } from 'react-router-dom';

export default function GuestLayout(props) {
  return (
    <div>
      <div className="w-96 my-4 mx-auto p-4 text-center border border-blue-300 bg-blue-50 rounded-md">
        <h6 className="font-medium">This view is inside Guest Layout</h6>
        <p className="mt-2">
          <code className="py-1 bg-gray-200">src/layouts/GuestLayout.jsx</code>
        </p>
      </div>
      <Outlet />
    </div>
  );
}
