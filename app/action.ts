"use server";

const googleScriptURL = process.env.GOOGLESCRIPTURL as string;
type Province = { code: number; name: string };
type District = { code: number; name: string };
type Ward = { code: number; name: string };

export const addRegistration = async (
  form: {
    tempProvince?: Province;
    tempDistrict?: District;
    tempWard?: Ward;
  },
  formData: FormData
) => {
  const companyName = formData.get("companyName") as string;
  const fullName = formData.get("fullName") as string;
  const phone = formData.get("phone") as string;
  const moneyUsed = formData.get("moneyUsed") as string;
  const budget = formData.get("budget") as string;
  const { tempProvince, tempDistrict, tempWard } = form;

  const body = {
        companyName,
        fullName,
        phone,
        province: tempProvince?.name,
        district: tempDistrict?.name,
        ward: tempWard?.name,
        moneyUsed,
        budget,
  };
  try {
    await fetch(googleScriptURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.log("error", error);
  }
};
