import { getDetailsLocation } from "@/apis/location";
import { Button } from "@/components/ui/button";
import Header from "@/pages/header/Header";
import { addProduct } from "@/redux/slice/cardSlice";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

export default function DetailsLocation() {
  const { locationId } = useParams();
  const { data: detailsLocation } = useQuery({
    queryKey: ["getDetailsLocation"],
    queryFn: () => getDetailsLocation(locationId as string),
  });
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  console.log("data", detailsLocation?.data.data);

  return (
    <div>
      <Header className="flex items-center justify-between w-full px-10 mx-auto bg-gradient-to-r from-purple-600 via-red-300 to-yellow-500" />
      <Link
        to="/location"
        className="flex justify-end w-20 gap-2 p-2 pr-2 mt-8 ml-auto mr-[1rem] text-white bg-green-500 rounded-md cursor-pointer hover:shadow-lg lg:mr-20"
      >
        <ArrowLeft></ArrowLeft>
        Back
      </Link>
      <h1 className="flex justify-center my-10 text-2xl font-bold lg:text-3xl">
        Location Details
      </h1>
      {detailsLocation ? (
        <div id="content">
          <div className="items-center mx-auto max-w-7.5xl">
          <div className="flex mx-auto space-x-2 lg:container ">
            <div className="flex w-full gap-10 lg:ml-0 lg:w-full lg:block">
              <img
              src={detailsLocation?.data?.data?.data?.image}
              alt="best trip"
              className="w-[22rem] h-70 object-cover rounded-md border lg:w-full lg:h-full mx-auto"
              />
            </div>
            <div className="hidden mr-0 lg:w-full lg:block">
              <div className="flex flex-wrap w-full md:w-full">
              <div className="flex flex-wrap mb-2">
                    <div className=" w-[49.3%] mr-2">
                        <img
                        src={detailsLocation?.data?.data?.data?.image}
                        alt="best trip"
                        className="w-[22rem] h-70 object-cover rounded-md border lg:w-full lg:h-60 "
                        />
                    </div>
                    <div className="w-[49.3%]">
                        <img
                        src={detailsLocation?.data?.data?.data?.image}
                        alt="best trip"
                        className="w-[22rem] h-70 object-cover rounded-md border lg:w-full lg:h-60"
                        />
                    </div>
                  </div>
              </div>
              <div className="w-ful">
                        <img
                        src={detailsLocation?.data?.data?.data?.image}
                        alt="best trip"
                        className="w-[22rem] h-70 object-cover rounded-md border lg:w-full lg:h-full"
                        />
                  </div>
            </div>
          </div>
          </div>
          <div className="items-center mx-auto lg:max-w-7.5xl lg:flex lg:container lg:space-x-8 w-[23.5rem]">
            <div className="flex-col w-full border rounded-lg lg:ml-0 lg:w-3/4 my-7 bg-slate-100">
              <div className="flex flex-col w-full gap-5 p-5 mt-3 space-y-4 text-xl ">
                <li>{detailsLocation?.data?.data?.data?.location}</li>
                <h1 className="text-xl font-bold">
                  {detailsLocation?.data?.data?.data?.country}
                </h1>
                <h1 className="text-xl font-bold">
                  Thời gian: 4 ngày <br></br>(Từ 20/5/2024 đến 24/5/2024) 
                </h1>
                <h1 className="text-xl font-bold">
                  Nơi khởi hành: TP. Đà Nẵng
                </h1>
                <h1 className="text-xl font-bold">
                  Giá: {detailsLocation?.data?.data?.data?.price}$
                </h1>
                <h1 className="text-xl font-bold">
                  Số chỗ còn: {detailsLocation?.data?.data?.data?.remainingCount}
                </h1>
              </div>
            </div>
            <div className="flex mt-5 mb-5 lg:block lg:w-full lg:mr-0 gap-x-6">
            <div className="flex grid lg:grid-cols-4 gap-x-7  mb-[2rem] pb-[3rem] lg:w-full mx-auto">
              <div className="w-40 h-40 py-3">
                <img
                src="https://travel.com.vn/images/icons/utility/thoi%20gian.png"
                alt=""
                className="w-[2rem] h-[2rem] mb-2 "
                />             
                <label>Thời gian</label>
                <p>4 ngày 3 đêm</p>
              </div>
              <div className="w-40 h-40 py-3">
                <img
                src="https://travel.com.vn/images/icons/utility/phuong%20tien%20di%20chuyen.png"
                alt=""
                className="w-[2rem] h-[2rem] mb-2"
                />             
                <label>Phương tiện di chuyển</label>
                <p>Máy bay, xe du lịch</p>
              </div>
              <div className="w-40 h-40 py-3">
                <img
                src="https://travel.com.vn/images/icons/utility/diem%20tham%20quan.png"
                alt=""
                className="w-[2rem] h-[2rem] mb-2"
                />             
                <label>Điểm tham quan</label>
                <p>7 địa điểm ngoài trời</p>
              </div>
              <div className="w-40 h-40 py-3">
                <img
                src="https://travel.com.vn/images/icons/utility/am%20thuc.png"
                alt=""
                className="w-[2rem] h-[2rem] mb-2"
                />             
                <label>Ẩm thực</label>
                <p>Buffet sáng, Theo thực đơn, Đặc sản địa phương</p>
              </div>
            </div>
            <div className="flex grid gap-x-8 lg:grid-cols-4">
              <div className="w-40 h-40 py-3">
                <img
                src="https://travel.com.vn/images/icons/utility/khach%20san.png"
                alt=""
                className="w-[2rem] h-[2rem] mb-2"
                />             
                <label>Khách sạn</label>
                <p>Khách sạn 4 sao</p>
              </div>
              <div className="w-40 h-40 py-3">
                <img
                src="https://travel.com.vn/images/icons/utility/thoi%20gian%20ly%20tuong.png"
                alt=""
                className="w-[2rem] h-[2rem] mb-2"
                />             
                <label>Thời gian lý tưởng</label>
                <p>Quanh năm</p>
              </div>
              <div className="w-40 h-40 py-3">
                <img
                src="https://travel.com.vn/images/icons/utility/doi%20tuong%20thich%20hop.png"
                alt=""
                className="w-[2rem] h-[2rem] mb-2"
                />             
                <label>Đối tượng thích hợp</label>
                <p>Cặp đôi, Gia đình nhiều thế hệ, Tập thể, Thanh niên </p>
              </div>
              <div className="w-40 h-40 py-3">
                <img
                src="https://travel.com.vn/images/icons/utility/uu%20dai.png"
                alt=""
                className="w-[2rem] h-[2rem] mb-2"
                />             
                <label>Ưu đãi</label>
                <p>Đã bao gồm ưu đãi trong giá tour</p>
              </div>
            </div>
            </div>
          </div>
          <div className="flex justify-center">
          {token ? (
                <Button
                  className="mx-auto ml-auto text-xl bg-yellow-400 w-80 hover:bg-yellow-500 hover:shadow-lg "
                  onClick={() =>
                    dispatch(addProduct(detailsLocation?.data?.data))
                  }
                >
                  Add To Cart
                </Button>
              ) : (
                <Button
                  className="mx-auto ml-auto text-xl bg-yellow-400 w-80 hover:bg-yellow-500 hover:shadow-lg"
                  onClick={() =>
                    dispatch(addProduct(detailsLocation?.data?.data))
                  }
                  disabled
                >
                  Add To Cart
                </Button>
              )}
          </div>
        </div>
      ) : (
        <div className="w-20 h-20 mx-auto border-b-4 border-gray-900 rounded-full animate-spin"></div>
      )} 
    </div>
  );
}
