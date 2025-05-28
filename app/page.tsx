"use client";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { addRegistration } from "./action";

const sliderList = [
  {
    id: 1,
    image: "/slider-img-1.png",
    title: "Hệ NLMT tại Hải Dương",
    capacity: "1 MWp",
  },
  {
    id: 2,
    image: "/slider-img-2.png",
    title: "Hệ NLMT tại Bến Tre",
    capacity: "10KWp",
  },
  {
    id: 3,
    image: "/slider-img-3.png",
    title: "Hệ NLMT tại Quảng Ngãi",
    capacity: "10KWp",
  },
  {
    id: 4,
    image: "/slider-img-4.png",
    title: "Hệ NLMT tại Long Ani",
    capacity: "10KWp",
  },
];

const steps = [
  {
    title: "Tiếp nhận thông tin",
    description: "Tiếp nhận thông tin và tư vấn giải pháp",
  },
  {
    title: "Khảo sát và báo giá",
    description: "Tiến hành khảo sát thực địa và báo giá",
  },
  {
    title: "Ký kết hợp đồng",
    description: "Soạn thảo hợp đồng dựa trên những ý kiến đã trao đổi",
  },
  {
    title: "Nghiệm thu",
    description: "Đảm bảo triển khai theo đúng kế hoạch",
  },
];

type Province = { code: number; name: string };
type District = { code: number; name: string };
type Ward = { code: number; name: string };

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [visibleItems, setVisibleItems] = useState(4); // responsive

  const totalItems = sliderList.length;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1);
      } else if (window.innerWidth < 768) {
        setVisibleItems(2);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(3);
      } else {
        setVisibleItems(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (current > totalItems - visibleItems) {
      setCurrent(Math.max(0, totalItems - visibleItems));
    }
  }, [visibleItems, totalItems]);

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const [selectedProvince, setSelectedProvince] = useState<number | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<number | null>(null);
  const [selectedWard, setSelectedWard] = useState<number | null>(null);
  console.log(selectedWard);

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/?depth=1")
      .then((res) => res.json())
      .then((data) => setProvinces(data));
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      fetch(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
        .then((res) => res.json())
        .then((data) => setDistricts(data.districts || []));
    } else {
      setDistricts([]);
      setWards([]);
    }
    setSelectedDistrict(null);
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
        .then((res) => res.json())
        .then((data) => setWards(data.wards || []));
    } else {
      setWards([]);
    }
  }, [selectedDistrict]);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const tempProvince = provinces.find((p) => p.code === selectedProvince);
    const tempDistrict = districts.find((p) => p.code === selectedDistrict);
    const tempWard = wards.find((p) => p.code === selectedWard);
    await addRegistration({ tempProvince, tempDistrict, tempWard }, formData);
  };

  return (
    <div className="bg-white max-w-[1000px] mx-auto">
      <div>
        <Image
          alt="Worker in safety helmet installing solar panel on roof with solar panels and house background"
          className="object-contain"
          height="300"
          src="/banner.png"
          width="1000"
        />

        <div className="mt-12 flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <h3 className="text-[#e60028] font-bold text-xl md:text-4xl mb-6 leading-tight">
              Vì sao bạn nên sử dụng điện năng lượng mặt trời Viettel?
            </h3>
            <Image
              alt="Worker in yellow helmet and grey uniform installing solar panel with drill on rooftop"
              className="rounded-3xl h-[300px] md:h-[500px] w-full mx-auto md:mx-0 object-cover"
              height="500"
              src="/section-1.png"
              width="800"
            />
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <ul className="space-y-8 text-gray-800 text-sm md:text-base">
              <li className="flex space-x-4 gap-15">
                <div className="flex flex-col items-center min-w-[40px] relative">
                  <span className="font-bold text-lg leading-none">01</span>
                  <svg
                    style={{ display: "none" }}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <symbol id="shape_SFnEvZiTmo" viewBox="0 0 105.42 105.42">
                      <polygon points="52.6 95.5 9.92 95.5 9.92 9.92 95.5 9.92 95.5 52.25 105.42 52.25 105.42 0 0 0 0 105.42 52.6 105.42 52.6 95.5" />
                    </symbol>
                  </svg>
                  <svg
                    className="absolute left-[15px] rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    width="53"
                    height="53"
                    preserveAspectRatio="none"
                    viewBox="0 0 105.42 105.42"
                    fill="rgba(228, 228, 228, 1)"
                  >
                    <use href="#shape_SFnEvZiTmo" />
                  </svg>
                  <svg
                    className="absolute top-[10px] left-[40px]"
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 144.083 144"
                    enable-background="new 0 0 144.083 144"
                    preserveAspectRatio="none"
                    width="53"
                    height="53"
                    fill="rgba(238, 0, 53, 1)"
                  >
                    <path d="M72.041,14.165c-31.94,0-57.833,25.894-57.833,57.834c0,31.939,25.893,57.836,57.833,57.836s57.835-25.896,57.835-57.836  C129.875,40.059,103.981,14.165,72.041,14.165z M105.069,79.256c-2.605,16.552-16.941,28.401-33.197,28.401  c-1.73,0-3.481-0.135-5.243-0.411C48.316,104.36,35.76,87.114,38.64,68.803c1.396-8.872,6.163-16.67,13.423-21.956  c6.25-4.55,13.702-6.764,21.316-6.403l-5.601-5.334l3.671-3.852l8.594,8.189l0.002-0.001l3.844,3.668l-3.668,3.852l-0.002-0.003  l-8.188,8.596l-3.848-3.671l5.188-5.441c-6.345-0.36-12.571,1.461-17.777,5.251c-5.965,4.343-9.881,10.749-11.028,18.038  c-2.365,15.044,7.951,29.213,22.996,31.583c15.044,2.364,29.212-7.949,31.579-22.995c1.563-9.932-2.4-19.941-10.346-26.122  l3.686-4.735C102.147,54.987,106.971,67.168,105.069,79.256z M60.897,81.809L60.7,81.348l4.944-2.096l0.195,0.462  c0.786,1.866,3.504,3.273,6.321,3.273c1.266,0,5.396-0.231,5.396-3.215c0-1.563-1.766-2.499-5.558-2.946  c-4.255-0.477-10.087-1.129-10.087-7.552c0-3.938,2.946-6.691,7.907-7.424v-3.027h5.329v3.04c2.303,0.405,5.342,1.408,7.037,4.875  l0.225,0.459l-4.551,2.105l-0.23-0.383c-0.797-1.316-3.141-2.349-5.334-2.349c-1.479,0-4.918,0.264-4.918,2.703  c0,1.753,2.216,2.157,5.114,2.504c4.531,0.558,10.734,1.322,10.734,7.994c0,4.91-3.982,7.495-8.076,7.953v3.452H69.82v-3.286  C65.521,87.384,62.361,85.235,60.897,81.809z"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-[#e60028] mb-1 text-[18px] leading-normal">
                    TIẾT KIỆM ĐẾN 50% CHI PHÍ TIỀN ĐIỆN
                  </p>
                  <p className="text-black text-[14px] leading-normal">
                    Giúp bạn giảm thiểu lên tới 50% chi phí hóa đơn tiền điện
                    hàng tháng.
                  </p>
                </div>
              </li>
              <li className="flex space-x-4 gap-15">
                <div className="flex flex-col items-center min-w-[40px] relative">
                  <span className="font-bold text-lg leading-none">02</span>
                  <svg
                    style={{ display: "none" }}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <symbol id="shape_SFnEvZiTmo" viewBox="0 0 105.42 105.42">
                      <polygon points="52.6 95.5 9.92 95.5 9.92 9.92 95.5 9.92 95.5 52.25 105.42 52.25 105.42 0 0 0 0 105.42 52.6 105.42 52.6 95.5" />
                    </symbol>
                  </svg>
                  <svg
                    className="absolute left-[15px] rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    width="53"
                    height="53"
                    preserveAspectRatio="none"
                    viewBox="0 0 105.42 105.42"
                    fill="rgba(228, 228, 228, 1)"
                  >
                    <use href="#shape_SFnEvZiTmo" />
                  </svg>
                  <svg
                    className="absolute top-[10px] left-[40px]"
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    x="0px"
                    y="0px"
                    viewBox="1 -1 100 100"
                    preserveAspectRatio="none"
                    width="53"
                    height="53"
                    fill="rgba(238, 0, 53, 1)"
                  >
                    <title>98all</title>
                    <path d="M95.4,49l-7.6-9.9l1.7-12.3l-11.6-4.6l-4.6-11.6l-12.3,1.7L51,4.6l-9.9,7.6l-12.3-1.7l-4.6,11.6l-11.6,4.6l1.7,12.3L6.6,49  l7.6,9.9l-1.7,12.3l11.6,4.6l4.6,11.6l12.3-1.7l9.9,7.6l9.9-7.6l12.3,1.7l4.6-11.6l11.6-4.7l-1.7-12.3L95.4,49z M47.4,63.4  L32.6,51.2l3.2-3.9l11,9l18.8-21.7l3.8,3.3L47.4,63.4z"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-[#e60028] mb-1 text-[18px] leading-normal">
                    ĐẦU TƯ 1 LẦN SỬ DỤNG 25 NĂM
                  </p>
                  <p className="text-black text-[14px] leading-normal">
                    Với tuổi thọ của hệ thống có thể lên tới 25 năm, bạn có thể
                    an tâm sử dụng và tận hưởng lợi ích từ hệ năng lượng mặt
                    trời mang lại.
                  </p>
                </div>
              </li>
              <li className="flex space-x-4 gap-15">
                <div className="flex flex-col items-center min-w-[40px] relative">
                  <span className="font-bold text-lg leading-none">03</span>
                  <svg
                    style={{ display: "none" }}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <symbol id="shape_SFnEvZiTmo" viewBox="0 0 105.42 105.42">
                      <polygon points="52.6 95.5 9.92 95.5 9.92 9.92 95.5 9.92 95.5 52.25 105.42 52.25 105.42 0 0 0 0 105.42 52.6 105.42 52.6 95.5" />
                    </symbol>
                  </svg>
                  <svg
                    className="absolute left-[15px] rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    width="53"
                    height="53"
                    preserveAspectRatio="none"
                    viewBox="0 0 105.42 105.42"
                    fill="rgba(228, 228, 228, 1)"
                  >
                    <use href="#shape_SFnEvZiTmo" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    width="53"
                    height="53"
                    preserveAspectRatio="none"
                    className="absolute top-[10px] left-[40px]"
                    fill="rgba(238, 0, 53, 1)"
                  >
                    <path d="M160-120v-401l-84 64-36-48 440-335 440 336-36 47-84-64v401H160Zm160-240q-17 0-28.5-11.5T280-400q0-17 11.5-28.5T320-440q17 0 28.5 11.5T360-400q0 17-11.5 28.5T320-360Zm160 0q-17 0-28.5-11.5T440-400q0-17 11.5-28.5T480-440q17 0 28.5 11.5T520-400q0 17-11.5 28.5T480-360Zm160 0q-17 0-28.5-11.5T600-400q0-17 11.5-28.5T640-440q17 0 28.5 11.5T680-400q0 17-11.5 28.5T640-360Z"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-[#e60028] mb-1 text-[18px] leading-normal">
                    TĂNG CƯỜNG GIÁ TRỊ BẤT ĐỘNG SẢN
                  </p>
                  <p className="text-black text-[14px] leading-normal">
                    Những ngôi nhà hoặc tòa nhà trang bị hệ thống điện năng
                    lượng mặt trời có thể tăng giá trị và hấp dẫn hơn trên thị
                    trường bất động sản.
                  </p>
                </div>
              </li>
              <li className="flex space-x-4 gap-15">
                <div className="flex flex-col items-center min-w-[40px] relative">
                  <span className="font-bold text-lg leading-none">04</span>
                  <svg
                    style={{ display: "none" }}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <symbol id="shape_SFnEvZiTmo" viewBox="0 0 105.42 105.42">
                      <polygon points="52.6 95.5 9.92 95.5 9.92 9.92 95.5 9.92 95.5 52.25 105.42 52.25 105.42 0 0 0 0 105.42 52.6 105.42 52.6 95.5" />
                    </symbol>
                  </svg>
                  <svg
                    className="absolute left-[15px] rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    width="53"
                    height="53"
                    preserveAspectRatio="none"
                    viewBox="0 0 105.42 105.42"
                    fill="rgba(228, 228, 228, 1)"
                  >
                    <use href="#shape_SFnEvZiTmo" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="53"
                    viewBox="0 -960 960 960"
                    width="53"
                    preserveAspectRatio="none"
                    className="absolute top-[10px] left-[40px]"
                    fill="rgba(238, 0, 53, 1)"
                  >
                    <path d="M480-100q-79 0-148-30t-120.5-81.5Q160-263 130-332t-30-148q0-79 30-148t81.5-120.5Q263-800 332-830t148-30v-100l160 160-160 160v-100q-108 0-184 76t-76 184q0 66 30.5 122.5T332-266q16-28 47.5-47.5T452-338q-3-21-8-42t-12-39q-11 9-24 14t-28 5q-33 0-56.5-23.5T300-480v-40q0-17-5.5-32T280-580q50-1 89 9 34 9 62 29.5t29 61.5q0 9-1.5 16.5T453-448q-13-10-26-18t-27-14q17 13 39 40t41 64q20-49 50-96.5t70-87.5q-23 16-44 34t-41 38q-7-11-11-24.5t-4-27.5q0-42 29-71t71-29h40q23 0 38-6t25-14q11-9 17-20 4 67-7 120-9 45-34 82.5T600-440q-15 0-28.5-4T547-455q-7 19-16 50.5T517-337q38 7 67 26t44 45q51-35 81.5-91T740-480h120q0 79-30 148t-81.5 120.5Q697-160 628-130t-148 30Z"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-[#e60028] mb-1 text-[18px] leading-normal">
                    BẢO VỆ MÔI TRƯỜNG
                  </p>
                  <p className="text-black text-[14px] leading-normal">
                    Điện năng lượng mặt trời là nguồn năng lượng tái tạo và
                    sạch, giúp giảm lượng khí thải carbon và ô nhiễm môi trường.
                  </p>
                </div>
              </li>
              <li className="flex space-x-4 gap-15">
                <div className="flex flex-col items-center min-w-[40px] relative">
                  <span className="font-bold text-lg leading-none">05</span>
                  <svg
                    style={{ display: "none" }}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <symbol id="shape_SFnEvZiTmo" viewBox="0 0 105.42 105.42">
                      <polygon points="52.6 95.5 9.92 95.5 9.92 9.92 95.5 9.92 95.5 52.25 105.42 52.25 105.42 0 0 0 0 105.42 52.6 105.42 52.6 95.5" />
                    </symbol>
                  </svg>
                  <svg
                    className="absolute left-[15px] rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    width="53"
                    height="53"
                    preserveAspectRatio="none"
                    viewBox="0 0 105.42 105.42"
                    fill="rgba(228, 228, 228, 1)"
                  >
                    <use href="#shape_SFnEvZiTmo" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="53"
                    height="53"
                    preserveAspectRatio="none"
                    viewBox="0 0 24 24"
                    className="absolute top-[10px] left-[40px]"
                    fill="rgba(238, 0, 53, 1)"
                  >
                    {" "}
                    <path d="M23,11H20V4L15,14H18V22M12.67,4H11V2H5V4H3.33A1.33,1.33 0 0,0 2,5.33V20.67C2,21.4 2.6,22 3.33,22H12.67C13.4,22 14,21.4 14,20.67V5.33A1.33,1.33 0 0,0 12.67,4Z"></path>{" "}
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-[#e60028] mb-1 text-[18px] leading-normal">
                    GIẢM NGUY CƠ THIẾU HỤT ĐIỆN
                  </p>
                  <p className="text-black text-[14px] leading-normal">
                    Sử dụng năng lượng mặt trời giúp giảm nguy cơ thiếu hụt năng
                    lượng, đặc biệt trong các khu vực có điều kiện ánh sáng mặt
                    trời tốt, nhờ vào việc cung cấp nguồn điện từ mặt trời ngay
                    tại chỗ.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Image
        alt="Construction worker wearing helmet and mask working on site with buildings in background"
        className="w-full object-cover"
        height="220"
        src="/solution.png"
        width="1000"
      />
      <div className="max-w-full mt-5">
        <section className="relative">
          <Image
            alt="Construction worker wearing helmet and mask working on site with buildings in background"
            className="h-[220px] absolute inset-0 w-full object-cover opacity-30"
            height="220"
            src="/section-2.png"
            width="1000"
          />
          <div className="relative px-4 pt-16 pb-8 text-center bg-transparent">
            <h2 className="text-[#e60028] text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide leading-tight select-none">
              QUY TRÌNH TRIỂN KHAI
            </h2>

            <div className="mt-12 flex flex-wrap justify-center items-start gap-12 max-w-6xl mx-auto">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center max-w-[170px] text-center"
                >
                  <div className="relative z-10 bg-blue-100 rounded-full w-[95px] h-[95px] flex items-center justify-center shadow-lg">
                    <span className="bg-[#051F4D] text-white font-bold text-xl rounded-md w-10 h-10 flex items-center justify-center select-none">
                      {index + 1}
                    </span>
                  </div>

                  {/* Arrow - show only on md+ and not for last item */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:flex absolute top-7 right-[-55px] items-center text-[#051F4D]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="54"
                        height="46"
                        preserveAspectRatio="none"
                        viewBox="0 0 1664 1896.08"
                        fill="rgba(5, 31, 77, 1)"
                      >
                        <path d="M45 1651q-19 19-32 13t-13-32V160q0-26 13-32t32 13l710 710q8 8 13 19V160q0-26 13-32t32 13l710 710q19 19 19 45t-19 45l-710 710q-19 19-32 13t-13-32V922q-5 10-13 19z" />
                      </svg>
                    </div>
                  )}

                  <div className="mt-6">
                    <p className="font-bold text-sm text-[#051F4D] leading-tight">
                      {step.title}
                    </p>
                    <p className="text-sm text-black leading-tight mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <p className="text-[#051F4D] text-[14px] font-bold text-center max-w-4xl mx-auto pb-8 px-4 leading-tight">
          Quy trình triển khai của chúng tôi đảm bảo sự chuyên nghiệp và hiệu
          quả ở từng bước.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-center text-[#e60028] font-bold text-lg sm:text-xl md:text-3xl mb-3 leading-tight">
          Tại sao bạn nên sử dụng điện năng lượng mặt trời của Viettel?
        </h2>
        <div className="w-[200px] md:w-[400px] h-[1px] bg-black mx-auto mt-1 mb-10"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 text-center">
          <div>
            <div className="text-[#0A1E4D] mb-2">
              <i className="fas fa-graduation-cap text-3xl"></i>
            </div>
            <p className="text-[#e60028] text-[42px] font-bold leading-tight">
              6 năm
            </p>
            <p className="text-sm text-black mt-1 leading-relaxed">
              Kinh nghiệm triển khai
            </p>
          </div>
          <div>
            <div className="text-[#0A1E4D] mb-2">
              <i className="fas fa-user-friends text-3xl"></i>
            </div>
            <p className="text-[#e60028] text-[42px] font-bold leading-tight">
              11 000+
            </p>
            <p className="text-sm text-black mt-1 leading-relaxed">
              Nhân sự đạt
              <br />
              chất lượng cao
            </p>
          </div>
          <div>
            <div className="text-[#0A1E4D] mb-2">
              <i className="fas fa-tools text-3xl"></i>
            </div>
            <p className="text-[#e60028] text-[42px] font-bold leading-tight">
              8 000+
            </p>
            <p className="text-sm text-black mt-1 leading-relaxed">
              Khách hàng triển khai
              <br />
              trên toàn quốc
            </p>
          </div>
          <div>
            <div className="text-[#0A1E4D] mb-2">
              <i className="fas fa-book-open text-3xl"></i>
            </div>
            <p className="text-[#e60028] text-[42px] font-bold leading-tight">
              250MWp
            </p>
            <p className="text-sm text-black mt-1 leading-relaxed">
              Công suất hệ đã lắp đặt,
              <br />
              triển khai
            </p>
          </div>
        </div>
        <div className="mt-10 bg-gray-100 rounded-xl p-4 flex items-center max-w-4xl mx-auto shadow-lg">
          <Image
            alt="Viettel Construction logo, circular with colorful elements"
            className="w-15 h-15 rounded-full flex-shrink-0 border-4 border-[#e60028]"
            height="50"
            src="/section-3.png"
            width="50"
          />
          <p className="text-black text-[19px] ml-4 leading-tight">
            Viettel Construction vinh dự nhận danh hiệu Thương hiệu Quốc Gia
            Việt Nam năm 2024 với hạng mục &quot;Thiết kế, cung cấp, lắp đặt hệ
            thống năng lượng điện mặt trời&quot;.
          </p>
        </div>
      </div>

      <Image
        alt="Worker in safety helmet installing solar panel on roof with solar panels and house background"
        className="object-contain"
        height="300"
        src="/section-4.png"
        width="1000"
      />

      <div className="flex flex-col items-center py-6 px-4">
        <h2 className="text-center text-[#e60028] font-bold text-lg sm:text-xl md:text-3xl mb-3 leading-tight">
          ĐỐI TÁC CHIẾN LƯỢC
        </h2>
        <div className="w-[200px] h-[1px] bg-black mx-auto mt-1 mb-10"></div>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 mb-6 w-full">
          <Image
            alt="Sigenergy company logo with red icon and black text on white background"
            className="h-20 object-contain"
            height="40"
            src="/partner-1.png"
            width="200"
          />
          <Image
            alt="Deye company logo with blue text on white background"
            className="h-20 object-contain"
            height="40"
            src="/partner-2.png"
            width="200"
          />
          <Image
            alt="LONGi Solar company logo with red and black text on white background"
            className="h-20 object-contain"
            height="40"
            src="/partner-3.png"
            width="200"
          />
          <Image
            alt="Huawei company logo with red flower icon and black text on white background"
            className="h-20 object-contain"
            height="40"
            src="/partner-4.png"
            width="200"
          />
        </div>
      </div>
      <div className="py-1">
        <h3 className="text-center text-[#e60028] font-bold text-lg sm:text-xl md:text-3xl mb-3 leading-tight">
          DỰ ÁN ĐÃ TRIỂN KHAI
        </h3>
        <p className="text-black text-2xl font-bold text-center">
          Đáp ứng mọi nhu cầu của khách hàng
        </p>
        <div className="w-[200px] h-[1px] bg-black mx-auto mt-5 mb-10"></div>
        <Image
          src="/construction-project.png"
          alt="construction project"
          width={250}
          height={150}
          layout="responsive"
          className="mb-3 object-cover"
        />
      </div>
      <Image
        alt="Worker in safety helmet installing solar panel on roof with solar panels and house background"
        className="object-contain"
        height="300"
        src="/achievement.png"
        width="1000"
      />

      <div className="bg-[#1a1a1a]">
        <section className="bg-[#b8002a] py-8 px-4">
          <h2 className="text-white text-center font-bold text-lg sm:text-xl md:text-3xl mb-3 leading-tight">
            Khách hàng nói về Viettel Construction
          </h2>
          <div className="w-24 h-[1px] bg-white mx-auto mt-1 mb-6"></div>
          <div className="max-w-7xl mx-auto flex flex-col items-center sm:flex-row gap-6 sm:gap-4 justify-center">
            <div className="bg-white rounded-lg p-6 flex flex-col justify-between max-w-xs sm:max-w-[320px]">
              <div className="text-black text-sm leading-relaxed mb-6">
                Tôi đã sử dụng hệ 5.46Kwp của Viettel Construction tròn 2 tháng,
                sản lượng điện tạo ra đến lúc này là 1420 số điện. Tôi rất hài
                lòng về chất lượng, cũng như hiệu suất mà dân pin mang lại. Tôi
                hy vọng với chất lượt vượt trội, đội ngũ kỹ sư lành nghề, chuyên
                nghiệp...
              </div>
              <div className="rounded-b-lg pt-4 pb-6 px-6 flex flex-col items-center">
                <Image
                  alt="Portrait of a man smiling wearing a white shirt"
                  className="rounded-full border-2 border-[#b8002a] mb-3"
                  height="80"
                  src="/customer-1.png"
                  width="80"
                />
                <p className="text-black font-semibold text-center text-sm leading-tight">
                  Trần Trọng Khang
                </p>
                <p className="text-black text-xs italic text-center mt-1">
                  Bình Thạnh, Hồ Chí Minh
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 flex flex-col justify-between max-w-xs sm:max-w-[320px]">
              <div className="text-black text-sm leading-relaxed mb-6">
                Đã tham khảo nhiều đơn vị lắp đặt trong quá trình tìm hiểu. Và
                tôi thấy yên tâm nhất ở Viettel Construction. Tôi đã lắp hệ bám
                tải 20KWp cho khách sạn của mình, mỗi tháng đã tiết kiệm được
                5tr tiền điện, đây là một khoản đầu tư dân hàn rất hợp lý cho
                khách sạn
              </div>
              <div className="rounded-b-lg pt-4 pb-6 px-6 flex flex-col items-center">
                <Image
                  alt="Portrait of a man smiling wearing a suit and tie"
                  className="rounded-full border-2 border-[#b8002a] mb-3"
                  height="80"
                  src="/customer-2.png"
                  width="80"
                />
                <p className="text-black font-semibold text-center text-sm leading-tight">
                  Vũ Trung Hiếu
                </p>
                <p className="text-black text-xs italic text-center mt-1">
                  Hà Đông, Hà Nội
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 flex flex-col justify-between max-w-xs sm:max-w-[320px]">
              <div className="text-black text-sm leading-relaxed mb-6">
                Tôi tin tưởng lắp đặt năng lượng mặt trời của Tổng Công ty Công
                Trình Viettel với chất lượng vượt trội, đội ngũ kỹ sư lành nghề,
                chuyên nghiệp... bảo hành dài hạn với chính sách trả góp lên tới
                90% giúp tôi tiết kiệm được chi phí đầu tư ban đầu
              </div>
              <div className="rounded-b-lg pt-4 pb-6 px-6 flex flex-col items-center">
                <Image
                  alt="Portrait of a woman smiling with long hair"
                  className="rounded-full border-2 border-[#b8002a] mb-3"
                  height="80"
                  src="/customer-3.png"
                  width="80"
                />
                <p className="text-black font-semibold text-center text-sm leading-tight">
                  Lê Hương Giang
                </p>
                <p className="text-black text-xs italic text-center mt-1">
                  Hải Châu, Đà Nẵng
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="font-montserrat text-black">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-10">
          <div className="max-w-md space-y-4">
            <Image
              alt="Viettel Construction logo in red and black text"
              className="w-[230px] h-auto mb-10"
              height="100"
              src="/logo.png"
              width="230"
            />
            <p className="text-sm font-normal leading-relaxed">
              Chi Nhánh Công Trình Viettel Bình Dương
            </p>
            <p className="text-xs flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"></path>
              </svg>
              <span className="font-light">
                Số 277 Đại Lộ Bình Dương, P.Chánh Nghĩa, Tp Thủ Dầu Một, Bình
                Dương
              </span>
            </p>
            <p className="text-xs flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="m20.487 17.14-4.065-3.696a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 0 0 .648-.291l1.86-2.171a.997.997 0 0 0-.085-1.39z"></path>
              </svg>
              <span className="font-light">Hotline: 0867 457 337</span>
            </p>
            <p className="text-xs flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm7.931 9h-2.764a14.67 14.67 0 0 0-1.792-6.243A8.013 8.013 0 0 1 19.931 11zM12.53 4.027c1.035 1.364 2.427 3.78 2.627 6.973H9.03c.139-2.596.994-5.028 2.451-6.974.172-.01.344-.026.519-.026.179 0 .354.016.53.027zm-3.842.7C7.704 6.618 7.136 8.762 7.03 11H4.069a8.013 8.013 0 0 1 4.619-6.273zM4.069 13h2.974c.136 2.379.665 4.478 1.556 6.23A8.01 8.01 0 0 1 4.069 13zm7.381 6.973C10.049 18.275 9.222 15.896 9.041 13h6.113c-.208 2.773-1.117 5.196-2.603 6.972-.182.012-.364.028-.551.028-.186 0-.367-.016-.55-.027zm4.011-.772c.955-1.794 1.538-3.901 1.691-6.201h2.778a8.005 8.005 0 0 1-4.469 6.201z"></path>
              </svg>
              <span className="font-light">www.viettelconstruction.com.vn</span>
            </p>
            <p className="text-xs flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z"></path>
              </svg>
              <span className="font-light">
                congtrinhviettel@viettel.com.vn
              </span>
            </p>
            <p className="text-sm font-normal leading-relaxed">
              Mã số doanh nghiệp: 0104753865 do Sở Kế hoạch và Đầu tư thành phố
              Hà Nội cấp lần đầu ngày 09/06/2010
            </p>
          </div>
          <form
            aria-label="Đăng ký tư vấn form"
            className="flex flex-col items-center justify-between border-2 border-[#dc2626] rounded-2xl p-6 max-w-md w-full space-y-4"
            onSubmit={(e) => handleRegister(e)}
            id="form-register"
          >
            <h2 className="text-center text-[#e60028] font-bold text-lg sm:text-xl md:text-3xl mb-3 leading-tight">
              ĐĂNG KÝ TƯ VẤN
            </h2>
            <input
              className="w-full bg-[#E4E4E4] rounded-md text-xs text-black placeholder:text-black px-3 py-2 focus:outline-none"
              placeholder="Tên doanh nghiệp"
              type="text"
              name="companyName"
            />
            <input
              className="w-full bg-[#E4E4E4] rounded-md text-xs text-black placeholder:text-black px-3 py-2 focus:outline-none"
              placeholder="Họ và tên"
              type="text"
              name="fullName"
            />
            <input
              className="w-full bg-[#E4E4E4] rounded-md text-xs text-black placeholder:text-black px-3 py-2 focus:outline-none"
              placeholder="Số điện thoại"
              type="tel"
              name="phone"
            />
            <div className="flex w-full gap-2">
              <select
                aria-label="Tỉnh/thành"
                name="province"
                className="bg-[#E4E4E4] text-xs text-black rounded-md px-3 py-2 w-1/3 focus:outline-none"
                value={selectedProvince ?? ""}
                onChange={(e) =>
                  setSelectedProvince(Number(e.target.value) || null)
                }
              >
                <option value="">Tỉnh/Thành</option>
                {provinces.map((province) => (
                  <option key={province.code} value={province.code}>
                    {province.name}
                  </option>
                ))}
              </select>
              <select
                aria-label="Quận/huyện"
                name="district"
                className="bg-[#E4E4E4] text-xs text-black rounded-md px-3 py-2 w-1/3 focus:outline-none"
                value={selectedDistrict ?? ""}
                onChange={(e) =>
                  setSelectedDistrict(Number(e.target.value) || null)
                }
              >
                <option value="">Quận/Huyện</option>
                {districts.map((district) => (
                  <option key={district.code} value={district.code}>
                    {district.name}
                  </option>
                ))}
              </select>
              <select
                aria-label="Xã/Phường"
                name="ward"
                className="bg-[#E4E4E4] text-xs text-black rounded-md px-3 py-2 w-1/3 focus:outline-none"
                onChange={(e) =>
                  setSelectedWard(Number(e.target.value) || null)
                }
              >
                <option value="">Xã/Phường</option>
                {wards.map((ward) => (
                  <option key={ward.code} value={ward.code}>
                    {ward.name}
                  </option>
                ))}
              </select>
            </div>
            <input
              className="w-full bg-[#E4E4E4] rounded-md text-xs text-black placeholder:text-black px-3 py-2 focus:outline-none"
              placeholder="Số tiền sử dụng điện mỗi tháng"
              type="text"
              name="moneyUsed"
            />
            <input
              className="w-full bg-[#E4E4E4] rounded-md text-xs text-black placeholder:text-black px-3 py-2 focus:outline-none"
              placeholder="Ngân sách dự kiến lắp đặt NLMT"
              type="text"
              name="budget"
            />
            <button
              className="w-50 h-15 bg-gradient-to-r from-[#f87171] to-[#dc2626] text-white text-sm font-bold rounded-full py-2 hover:brightness-110 transition"
              type="submit"
            >
              ĐĂNG KÝ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
