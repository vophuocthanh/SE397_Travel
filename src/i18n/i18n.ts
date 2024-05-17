import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const locals = {
    en:'English',
    vi:'Tiếng Việt'
}

const resources = {
    en : {
        translation: {
            'address_tour': 'Plan your tour ever',
            "Tours":"Tours",
            "Locations":"Locations",
            "Chat AI":"Chat AI",
            "Cart":"Your shopping cart",
            "No products in the cart":"No products in the cart",
            "Information_tour": "Making the Most of Your Travel Experience in 2024",
            "Destination":"View All Destination",
            "address_location": "Top Locations to Explore",
            "Information_location": "Here are some of the most visited places in 2024",
            "title": "Why Choose Tour",
            "buy":"Buy",
            "Tour_network": "Tour sales network",
            "Tour_network_1": "First in Vietnam",
            "Tour_network_2": "Apply the latest technology",
            "Pay": "Pay",
            "Pay_1": "Safe & flexible",
            "Book_tour": "Book tour",
            "Book_tour_1": "Easy & fast with just 3 steps",
            "Price": "Price",
            "Price_1": "Always have the best price",
            "Products": "Products & Services",
            "Products_1": "Diversity – Quality – Safety",
            "Support": "Support",
            "Support1": "Hotline & online (08:00 - 22:00)",
            "domestic": "Domestic tourism",
            "foreign": "Travel abroad",
            "Tour_line": "Tour line",
            "Retail_service": "Retail service",
            "Contact": "Contact",
            "Information": "Information",
            "search_information": "Look for information",
            "Social_network": "Social network",
            "Certification": "Certification",
            "Accept_payment": "Accept payment",
            "Copyright": "Copyright by TravelTour © 2024",

            "My_Account":"My Account",
            "Account":"Account",
            "log_out":"Log out",
            "Sign_Up":"Sign Up",
            "Sign_In":"Login",
            "Back":"Back",
            "search":"Search Tour",
            "search_location":"Search Location",

            "Nation":"Nation",
            "time":"time",
            "Starting":"Starting",
            "Number of seats available":"Number of seats available",

            "Transport":"Transport",
            "Sight_seeing":"Sight seeing",
            "Cuisine":"Cuisine",
            "Hotel":"Hotel",
            "Ideal time":"Ideal time",
            "Suitable subject":"Suitable subject",
            "Endow":"Endow",
            "Write a comment":"Write a comment ...",
            "Import content":"Import content ...",
            "Send":"Send",
            
        }
    },
    vi: {
        translation: {
            'address_tour': 'Lên kế hoạch cho chuyến đi tuyệt vời nhất của bạn',
            "Tours":"Tours",
            "Locations":"Locations",
            "Chat AI":"Chat AI",
            "Cart":"Giỏ hàng của bạn",
            "No products in the cart":"Không có sản phẩm trong giỏ hàng",
            "Information_tour": "Tận dụng tối đa trải nghiệm du lịch của bạn vào năm 2024",
            "address_location": "Các địa điểm hàng đầu để khám phá",
            "Destination":"Xem tất cả điểm đến",
            "Information_location": "Dưới đây là một số địa điểm được ghé thăm nhiều nhất năm 2024",
            "title": "Vì sao chọn Tour",
            "buy":"Mua",
            "Tour_network": "Mạng bán tour",
            "Tour_network_1": "Đầu tiên tại Việt Nam",
            "Tour_network_2": "Ứng dụng công nghệ mới nhất",
            "Pay": "Thanh toán",
            "Pay_1": "An toàn & linh hoạt",
            "Book_tour": "Đặt tour",
            "Book_tour_1": "Dễ dàng & nhanh chóng chỉ với 3 bước",
            "Price": "Giá",
            "Price_1": "Luôn có mức giá tốt nhất",
            "Products": "Sản phẩm & Dịch vụ",
            "Products_1": "Đa dạng – Chất lượng – An toàn",
            "Support": "Hỗ trợ",
            "Support1": "Hotline & trực tuyến (08h00 - 22h00)",
            "domestic": "Du lịch trong nước",
            "foreign": "Du lịch nước ngoài",
            "Tour_line": "Tham quan theo tuyến",
            "Retail_service": "Dịch vụ lẻ",
            "Contact": "Liên hệ",
            "Information": "Thông tin",
            "search_information": "Tìm kiếm thông tin",
            "Social_network": "Mạng xã hội",
            "Certification": "Chứng nhận",
            "Accept_payment": "Chấp nhận thanh toán",
            "Copyright": "Bản quyền thuộc về TravelTour © 2024",

            "My_Account":"Tài khoản của tôi",
            "Account":"Tài khoản",
            "log_out":"Đăng xuất",
            "Sign_Up":"Đăng ký",
            "Sign_In":"Đăng nhập",
            "Back":"Quay lại",
            "search":"Tìm kiếm Tour",
            "search_location":"Tìm kiếm Location",

            "Nation":"Quốc gia",
            "time":"Thời gian",
            "Starting":"Nơi khởi hành",
            "Number of seats available":"Số chỗ còn nhận",

            "Transport":"Phương tiện di chuyển",
            "Sight_seeing":"Điểm tham quan",
            "Cuisine":"Ẩm thực",
            "Hotel":"Khách sạn",
            "Ideal time":"Thời gian lý tưởng",
            "Suitable subject":"Đối tượng thích hợp",
            "Endow":"Ưu đãi",
            "Write a comment":"Viết bình luận ...",
            "Import content":"Nhập nội dung ...",
            "Send":"Gửi",
        }
    }
}

i18n.use(initReactI18next).init({
    resources,
    lng:'vi',
    interpolation: {
        escapeValue: false // react already safes from xss
    }
})