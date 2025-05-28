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
  const fullName = formData.get("fullName") as string;
  try {
    await fetch(googleScriptURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
      }),
    });
  } catch (error) {
    console.log(error);
  }
};
