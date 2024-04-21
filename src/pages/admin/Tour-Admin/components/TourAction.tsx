import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface TourActionsProps {
  tourId: string; // Thay string bằng kiểu dữ liệu phù hợp với tourId của bạn
}
const TourActions: React.FC<TourActionsProps> = ({ tourId }) => {
  const [showActions, setShowActions] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setShowActions(!showActions);
  };

  const handleCloseActions = () => {
    setShowActions(false);
  };

  // const handleCopyId = () => {
  //   // Xử lý sao chép ID tour
  // };

  // const handleViewCustomer = () => {
  //   // Xử lý hiển thị thông tin khách hàng
  // };

  const handleViewTourstDetails = () => {
    navigate(`/admin/tour/detail/${tourId}`);
  };

  return (
    <div className="relative">
      <button onClick={handleMenuClick} className="focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 cursor-pointer"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0-5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {showActions && (
        <div className="absolute top-0 right-0 z-10 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="border-b border-gray-200">
              {/* <Button
                onClick={handleCopyId}
                className="block px-4 py-2 my-1 text-sm text-gray-100 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                Copy ID
              </Button>
              <Button
                onClick={handleViewCustomer}
                className="block px-4 py-2 my-1 text-sm text-gray-100 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                View Customer
              </Button> */}
              <Button
                onClick={handleViewTourstDetails}
                className="block px-4 py-2 my-1 text-sm text-gray-100 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                View Tour Details
              </Button>
            </div>

            <Button
              onClick={handleCloseActions}
              className="block px-4 py-2 mt-2 text-sm text-blue-500 ml-36 hover:bg-gray-100 hover:text-blue-700"
              role="menuitem"
            >
              Close
            </Button>
          </div>
        </div>
      )}
      {showActions && (
        <div className="fixed inset-0 z-0 opacity-25 bg-black-100"></div>
      )}
    </div>
  );
};

export default TourActions;
