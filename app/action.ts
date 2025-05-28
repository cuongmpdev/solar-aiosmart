"use server";

const googleScriptURL = process.env.GOOGLESCRIPTURL as string;
// type Province = { code: number; name: string };
// type District = { code: number; name: string };
// type Ward = { code: number; name: string };

export const addRegistration = async (
  // form: {
  //   tempProvince?: Province;
  //   tempDistrict?: District;
  //   tempWard?: Ward;
  // },
  // formData: FormData
) => {
  // const companyName = formData.get("companyName") as string;
  // const fullName = formData.get("fullName") as string;
  // const phone = formData.get("phone") as string;
  // const moneyUsed = formData.get("moneyUsed") as string;
  // const budget = formData.get("budget") as string;
  // const { tempProvince, tempDistrict, tempWard } = form;
  try {
    await fetch(googleScriptURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companyName: "Công ty ABC",
        fullName: "Nguyễn Văn A",
        phone: "0123456789",
        province: "Hà Nội",
        district: "Cầu Giấy",
        ward: "Dịch Vọng",
        moneyUsed: "5000000",
        budget: "10000000",
      }),
    });
  } catch (error) {
    console.log(error);
  }
};
