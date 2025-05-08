"use server"

const googleScriptURL = process.env.GOOGLESCRIPTURL as string

export const addRegistration = async (form: HTMLFormElement, formData: FormData) => {
    const fullName = formData.get("fullName") as string;
    const phone = formData.get("phone") as string;
    const moneyUsed = formData.get("moneyUsed") as string;
    const budget = formData.get("budget") as string;
  
    // const province = form.province.options[form.province.selectedIndex].text;
    // const district = form.district.options[form.district.selectedIndex].text;
    // const ward = form.ward.options[form.ward.selectedIndex].text;
    try {
        await fetch(googleScriptURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fullName, 
                phone,
                // province,
                // district,
                // ward,
                moneyUsed,
                budget
            })
        })
    } catch (error) {
        console.log(error)
    }
    
}