import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { apiFetch } from "../services/apiFetch";




const INDUSTRY_TYPES = [
  { id: "1", name: "Accounting service" },
  { id: "2", name: "Agriculture & Allied Industries" },
  { id: "3", name: "Auto Components" },
  { id: "4", name: "Automobile" },
  { id: "5", name: "Aviation" },
  { id: "6", name: "Banking" },
  { id: "7", name: "Biotechnology" },
  { id: "8", name: "Cement" },
  { id: "9", name: "Chemical" },
  { id: "10", name: "Consumer Durables" },
  { id: "11", name: "Cosmetics & Toiletries" },
  { id: "12", name: "Defence Manufacturing" },
  { id: "13", name: "E-commerce" },
  { id: "14", name: "Education & training" },
  { id: "15", name: "Electronics System Design & Manufacturing" },
  { id: "16", name: "Engineering & Capital goods" },
  { id: "17", name: "Fertilizers" },
  { id: "18", name: "Financial Services" },
  { id: "19", name: "FMCG" },
  { id: "20", name: "Gems & Jewellery" },
  { id: "21", name: "Healthcare" },
  { id: "22", name: "Infrastructure" },
  { id: "23", name: "Insecticides" },
  { id: "24", name: "Insurance" },
  { id: "25", name: "IT & BPM" },
  { id: "26", name: "Manufacturing" },
  { id: "27", name: "Media & Entertainment" },
  { id: "28", name: "Medical Device" },
  { id: "29", name: "Metal & Mining" },
  { id: "30", name: "MSME" },
  { id: "31", name: "Oil & gases" },
  { id: "32", name: "Pharmaceuticals" },
  { id: "33", name: "Plantation Product" },
  { id: "34", name: "Ports" },
  { id: "35", name: "Power" },
  { id: "36", name: "Railway" },
  { id: "37", name: "Real Estate" },
  { id: "38", name: "Renewable Energy" },
  { id: "39", name: "Retail" },
  { id: "40", name: "Roads" },
  { id: "41", name: "Science & Technology" },
  { id: "42", name: "Shaving Systems" },
  { id: "43", name: "Steel" },
  { id: "44", name: "Telecommunication" },
  { id: "45", name: "Textiles" },
  { id: "46", name: "Tourism & Hospitality" },
];


const NATURE_OF_WORK = [
  { id: "1", name: "Accountant" },
  { id: "2", name: "CA" },
  { id: "3", name: "Distributor" },
  { id: "4", name: "Retailer" },
  { id: "5", name: "Service Provider" },
  { id: "6", name: "STP" },
  { id: "7", name: "Trader" },
];


const COUNTRIES = [
  { id: "3", name: "Afghanistan" },
  { id: "15", name: "Åland Islands" },
  { id: "6", name: "Albania" },
  { id: "62", name: "Algeria" },
  { id: "11", name: "American Samoa" },
  { id: "104", name: "Andorra" },
  { id: "8", name: "Angola" },
  { id: "5", name: "Anguilla" },
  { id: "9", name: "Antarctica" },
  { id: "4", name: "Antigua And Barbuda" },
  { id: "10", name: "Argentina" },
  { id: "7", name: "Armenia" },
  { id: "14", name: "Aruba" },
  { id: "13", name: "Australia" },
  { id: "12", name: "Austria" },
  { id: "16", name: "Azerbaijan" },
  { id: "32", name: "Bahamas" },
  { id: "23", name: "Bahrain" },
  { id: "19", name: "Bangladesh" },
  { id: "18", name: "Barbados" },
  { id: "36", name: "Belarus" },
  { id: "20", name: "Belgium" },
  { id: "37", name: "Belize" },
  { id: "25", name: "Benin" },
  { id: "27", name: "Bermuda" },
  { id: "33", name: "Bhutan" },
  { id: "29", name: "Bolivia (Plurinational State Of)" },
  { id: "30", name: "Bonaire, Sint Eustatius And Saba" },
  { id: "17", name: "Bosnia And Herzegovina" },
  { id: "35", name: "Botswana" },
  { id: "34", name: "Bouvet Island" },
  { id: "31", name: "Brazil" },
  { id: "105", name: "British Indian Ocean Territory" },
  { id: "28", name: "Brunei Darussalam" },
  { id: "22", name: "Bulgaria" },
  { id: "21", name: "Burkina Faso" },
  { id: "24", name: "Burundi" },
  { id: "52", name: "Cabo Verde" },
  { id: "116", name: "Cambodia" },
  { id: "47", name: "Cameroon" },
  { id: "38", name: "Canada" },
  { id: "123", name: "Cayman Islands" },
  { id: "41", name: "Central African Republic" },
  { id: "214", name: "Chad" },
  { id: "46", name: "Chile" },
  { id: "48", name: "China" },
  { id: "54", name: "Christmas Island" },
  { id: "39", name: "Cocos (Keeling) Islands" },
  { id: "49", name: "Colombia" },
  { id: "118", name: "Comoros" },
  { id: "42", name: "Congo" },
  { id: "40", name: "Congo, Democratic Republic Of The" },
  { id: "45", name: "Cook Islands" },
  { id: "50", name: "Costa Rica" },
  { id: "44", name: "Côte DIvoire" },
  { id: "98", name: "Croatia" },
  { id: "51", name: "Cuba" },
  { id: "53", name: "Curaçao" },
  { id: "55", name: "Cyprus" },
  { id: "56", name: "Czechia" },
  { id: "59", name: "Denmark" },
  { id: "58", name: "Djibouti" },
  { id: "60", name: "Dominica" },
  { id: "61", name: "Dominican Republic" },
  { id: "63", name: "Ecuador" },
  { id: "65", name: "Egypt" },
  { id: "209", name: "El Salvador" },
  { id: "88", name: "Equatorial Guinea" },
  { id: "67", name: "Eritrea" },
  { id: "64", name: "Estonia" },
  { id: "212", name: "Eswatini" },
  { id: "69", name: "Ethiopia" },
  { id: "72", name: "Falkland Islands (Malvinas)" },
  { id: "74", name: "Faroe Islands" },
  { id: "71", name: "Fiji" },
  { id: "70", name: "Finland" },
  { id: "75", name: "France" },
  { id: "80", name: "French Guiana" },
  { id: "174", name: "French Polynesia" },
  { id: "215", name: "French Southern Territories" },
  { id: "76", name: "Gabon" },
  { id: "85", name: "Gambia" },
  { id: "79", name: "Georgia" },
  { id: "57", name: "Germany" },
  { id: "82", name: "Ghana" },
  { id: "83", name: "Gibraltar" },
  { id: "89", name: "Greece" },
  { id: "84", name: "Greenland" },
  { id: "78", name: "Grenada" },
  { id: "87", name: "Guadeloupe" },
  { id: "92", name: "Guam" },
  { id: "91", name: "Guatemala" },
  { id: "81", name: "Guernsey" },
  { id: "86", name: "Guinea" },
  { id: "93", name: "Guinea-Bissau" },
  { id: "94", name: "Guyana" },
  { id: "99", name: "Haiti" },
  { id: "96", name: "Heard Island And McDonald Islands" },
  { id: "235", name: "Holy See" },
  { id: "97", name: "Honduras" },
  { id: "95", name: "Hong Kong" },
  { id: "100", name: "Hungary" },
  { id: "108", name: "Iceland" },
  { id: "1", name: "India" },
  { id: "107", name: "Iran (Islamic Republic Of)" },
  { id: "106", name: "Iraq" },
  { id: "101", name: "Ireland" },
  { id: "103", name: "Isle Of Man" },
  { id: "102", name: "Israel" },
  { id: "109", name: "Italy" },
  { id: "111", name: "Jamaica" },
  { id: "113", name: "Japan" },
  { id: "110", name: "Jersey" },
  { id: "112", name: "Jordan" },
  { id: "124", name: "Kazakhstan" },
  { id: "114", name: "Kenya" },
  { id: "117", name: "Kiribati" },
  { id: "120", name: "Korea (Democratic Peoples Republic Of)" },
  { id: "121", name: "Korea, Republic Of" },
  { id: "122", name: "Kuwait" },
  { id: "115", name: "Kyrgyzstan" },
  { id: "125", name: "Lao Peoples Democratic Republic" },
  { id: "134", name: "Latvia" },
  { id: "126", name: "Lebanon" },
  { id: "131", name: "Lesotho" },
  { id: "130", name: "Liberia" },
  { id: "135", name: "Libya" },
  { id: "128", name: "Liechtenstein" },
  { id: "132", name: "Lithuania" },
  { id: "133", name: "Luxembourg" },
  { id: "147", name: "Macao" },
  { id: "141", name: "Madagascar" },
  { id: "155", name: "Malawi" },
  { id: "157", name: "Malaysia" },
  { id: "154", name: "Maldives" },
  { id: "144", name: "Mali" },
  { id: "152", name: "Malta" },
  { id: "142", name: "Marshall Islands" },
  { id: "149", name: "Martinique" },
  { id: "150", name: "Mauritania" },
  { id: "153", name: "Mauritius" },
  { id: "245", name: "Mayotte" },
  { id: "156", name: "Mexico" },
  { id: "73", name: "Micronesia (Federated States Of)" },
  { id: "138", name: "Moldova, Republic Of" },
  { id: "137", name: "Monaco" },
  { id: "146", name: "Mongolia" },
  { id: "139", name: "Montenegro" },
  { id: "151", name: "Montserrat" },
  { id: "136", name: "Morocco" },
  { id: "158", name: "Mozambique" },
  { id: "145", name: "Myanmar" },
  { id: "159", name: "Namibia" },
  { id: "168", name: "Nauru" },
  { id: "167", name: "Nepal" },
  { id: "165", name: "Netherlands" },
  { id: "160", name: "New Caledonia" },
  { id: "170", name: "New Zealand" },
  { id: "164", name: "Nicaragua" },
  { id: "161", name: "Niger" },
  { id: "163", name: "Nigeria" },
  { id: "169", name: "Niue" },
  { id: "162", name: "Norfolk Island" },
  { id: "143", name: "North Macedonia" },
  { id: "148", name: "Northern Mariana Islands" },
  { id: "166", name: "Norway" },
  { id: "171", name: "Oman" },
  { id: "177", name: "Pakistan" },
  { id: "184", name: "Palau" },
  { id: "182", name: "Palestine, State Of" },
  { id: "172", name: "Panama" },
  { id: "175", name: "Papua New Guinea" },
  { id: "185", name: "Paraguay" },
  { id: "173", name: "Peru" },
  { id: "176", name: "Philippines" },
  { id: "180", name: "Pitcairn" },
  { id: "178", name: "Poland" },
  { id: "183", name: "Portugal" },
  { id: "181", name: "Puerto Rico" },
  { id: "186", name: "Qatar" },
  { id: "187", name: "Réunion" },
  { id: "188", name: "Romania" },
  { id: "190", name: "Russian Federation" },
  { id: "191", name: "Rwanda" },
  { id: "26", name: "Saint Barthélemy" },
  { id: "198", name: "Saint Helena, Ascension And Tristan Da Cunha" },
  { id: "119", name: "Saint Kitts And Nevis" },
  { id: "127", name: "Saint Lucia" },
  { id: "140", name: "Saint Martin (French Part)" },
  { id: "179", name: "Saint Pierre And Miquelon" },
  { id: "236", name: "Saint Vincent And The Grenadines" },
  { id: "243", name: "Samoa" },
  { id: "203", name: "San Marino" },
  { id: "208", name: "Sao Tome And Principe" },
  { id: "192", name: "Saudi Arabia" },
  { id: "204", name: "Senegal" },
  { id: "189", name: "Serbia" },
  { id: "194", name: "Seychelles" },
  { id: "202", name: "Sierra Leone" },
  { id: "197", name: "Singapore" },
  { id: "210", name: "Sint Maarten (Dutch Part)" },
  { id: "201", name: "Slovakia" },
  { id: "199", name: "Slovenia" },
  { id: "193", name: "Solomon Islands" },
  { id: "205", name: "Somalia" },
  { id: "246", name: "South Africa" },
  { id: "90", name: "South Georgia And The South Sandwich Islands" },
  { id: "207", name: "South Sudan" },
  { id: "68", name: "Spain" },
  { id: "129", name: "Sri Lanka" },
  { id: "195", name: "Sudan" },
  { id: "206", name: "Suriname" },
  { id: "200", name: "Svalbard And Jan Mayen" },
  { id: "196", name: "Sweden" },
  { id: "43", name: "Switzerland" },
  { id: "211", name: "Syrian Arab Republic" },
  { id: "227", name: "Taiwan, Province Of China" },
  { id: "218", name: "Tajikistan" },
  { id: "228", name: "Tanzania, United Republic Of" },
  { id: "217", name: "Thailand" },
  { id: "220", name: "Timor-Leste" },
  { id: "216", name: "Togo" },
  { id: "219", name: "Tokelau" },
  { id: "223", name: "Tonga" },
  { id: "225", name: "Trinidad And Tobago" },
  { id: "222", name: "Tunisia" },
  { id: "224", name: "Turkey" },
  { id: "221", name: "Turkmenistan" },
  { id: "213", name: "Turks And Caicos Islands" },
  { id: "226", name: "Tuvalu" },
  { id: "230", name: "Uganda" },
  { id: "229", name: "Ukraine" },
  { id: "2", name: "United Arab Emirates" },
  { id: "77", name: "United Kingdom Of Great Britain And Northern Ireland" },
  { id: "231", name: "United States Minor Outlying Islands" },
  { id: "232", name: "United States Of America" },
  { id: "233", name: "Uruguay" },
  { id: "234", name: "Uzbekistan" },
  { id: "241", name: "Vanuatu" },
  { id: "237", name: "Venezuela (Bolivarian Republic Of)" },
  { id: "240", name: "Viet Nam" },
  { id: "238", name: "Virgin Islands (British)" },
  { id: "239", name: "Virgin Islands (U.S.)" },
  { id: "242", name: "Wallis And Futuna" },
  { id: "66", name: "Western Sahara" },
  { id: "244", name: "Yemen" },
  { id: "247", name: "Zambia" },
  { id: "248", name: "Zimbabwe" },
];


const INDIA_STATES = [
  { id: "32", name: "Andaman & Nicobar" },
  { id: "1", name: "Andhra Pradesh" },
  { id: "3", name: "Arunachal Pradesh" },
  { id: "2", name: "Assam" },
  { id: "4", name: "Bihar" },
  { id: "31", name: "Chandigarh" },
  { id: "35", name: "Chattisgarh" },
  { id: "30", name: "Dadra And Nagar Haveli" },
  { id: "29", name: "Daman & Diu" },
  { id: "25", name: "Delhi" },
  { id: "26", name: "Goa" },
  { id: "5", name: "Gujrat" },
  { id: "6", name: "Haryana" },
  { id: "7", name: "Himachal Pradesh" },
  { id: "8", name: "Jammu & Kashmir" },
  { id: "34", name: "Jharkhand" },
  { id: "9", name: "Karnataka" },
  { id: "10", name: "Kerala" },
  { id: "37", name: "Ladakh" },
  { id: "28", name: "Lakshdweep" },
  { id: "11", name: "Madhya Pradesh" },
  { id: "12", name: "Maharashtra" },
  { id: "13", name: "Manipur" },
  { id: "14", name: "Meghalaya" },
  { id: "15", name: "Mizoram" },
  { id: "16", name: "Nagaland" },
  { id: "17", name: "Odisha" },
  { id: "38", name: "Other  Country" },
  { id: "39", name: "Other Territory" },
  { id: "27", name: "Pondichery" },
  { id: "18", name: "Punjab" },
  { id: "19", name: "Rajasthan" },
  { id: "20", name: "Sikkim" },
  { id: "21", name: "Tamil Nadu" },
  { id: "40", name: "Telangana" },
  { id: "22", name: "Tripura" },
  { id: "23", name: "Uttar Pradesh" },
  { id: "33", name: "Uttarakhand" },
  { id: "24", name: "West Bengal" },
];




const AddCompany = () => {


  const [fyStart, setFyStart] = useState(new Date(2025, 3, 1)); // 01 Apr 2025


  const [form, setForm] = useState({
  company_name: "",
  print_name: "",
  short_name: "",

  ro_address1: "",
  ro_address2: "",
  ro_country: "India",
  ro_state: "Punjab",
  ro_city: "",
  ro_pin: "",

  stock_valuation: "AVG ",
  industry_type: "",
  nature_of_work: "",

  co_address1: "",
  co_address2: "",
  co_country: "India",
  co_state: "Punjab",
  co_city: "",
  co_pin: "",
});

const formatDateYYYYMMDD = (dateObj) => {
  if (!dateObj) return "";
  const yyyy = dateObj.getFullYear();
  const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
  const dd = String(dateObj.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};


const handleChange = (e) => {
  const { name, value } = e.target;
  setForm((prev) => ({ ...prev, [name]: value }));
};

const handleSave = async () => {
  try {
   const payload = {
  comp_name: form.company_name,
  print_name: form.print_name,
  short_name: form.short_name,

  fy_start: formatDateYYYYMMDD(fyStart),
  fy_end: "2026-03-31",

  default_stock: form.stock_valuation,
  industry_type: form.industry_type,
  nature_of_work: form.nature_of_work,

  ro_adrs1: form.ro_address1,
  ro_adrs2: form.ro_address2,
  ro_country: form.ro_country,
  ro_state: form.ro_state,
  ro_city: form.ro_city,
  ro_pin: form.ro_pin,

  co_adrs1: form.co_address1,
  co_adrs2: form.co_address2,
  co_country: form.co_country,
  co_state: form.co_state,
  co_city: form.co_city,
  co_pin: form.co_pin,
};


    console.log("CREATE COMPANY PAYLOAD ✅", payload);

    const res = await apiFetch("https://erp.aicountly.com/api/companies/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log("CREATE COMPANY RESPONSE ✅", res);
  } catch (err) {
    console.error("CREATE COMPANY ERROR ❌", err);
  }
};



  return (
    <div className="p-6 pt-0 min-h-screen text-[#141824] font-sans">

      <h1 className="text-2xl font-extrabold mb-6">Add A Company</h1>

    <form   onSubmit={(e) => {
    e.preventDefault();
    handleSave();
  }}>
       {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-[#31374a]">

        {/* COMPANY DETAILS */}
      <section className="bg-white p-5 rounded-xl border border-[#cbd0dd] focus-input">

        <div className="space-y-4">

          {/* Company Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="font-medium text-sm col-span-1">
              Company Name
            </label>

          <input
            name="company_name" required
            value={form.company_name}
            onChange={handleChange}
            className="col-span-3 border rounded-md px-3 py-2 border-[#cbd0dd] focus-input" 
          />

          </div>

          {/* Print Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="font-medium text-sm col-span-1">
              Print Name
            </label>

          <input
            name="print_name" required
            value={form.print_name}
            onChange={handleChange}
            className="col-span-3 border rounded-md px-3 py-2 border-[#cbd0dd] focus-input"
          />

          </div>

          {/* Short Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="font-medium text-sm col-span-1">
              Short Name
            </label>

         <input
            name="short_name" required
            value={form.short_name}
            onChange={handleChange}
            className="col-span-3 border rounded-md px-3 py-2 border-[#cbd0dd] focus-input"
          />

          </div>

          {/* Fy Year */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="font-medium text-sm col-span-1">
              Fy. Year
            </label>

            <div className="col-span-3 flex gap-2">
  
              {/* ✅ ONLY THIS FIELD WITH CALENDAR */}
              <DatePicker
                selected={fyStart}
                onChange={(date) => setFyStart(date)}
                dateFormat="dd-MM-yyyy"
                className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input placeholder:text-[12px] font-semibold"
              />

              <input
                className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input placeholder:text-[12px] font-semibold"
                value="31-03-2026"
                readOnly
              />


            </div>

          </div>

        </div>

      </section>

          {/* RO ADDRESS */}
      <section className="bg-white p-5 rounded-xl shadow-sm border border-[#cbd0dd] focus-input">
            <h2 className="font-bold text-[16px] mb-2">Ro. Address</h2>
          
       

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="md:col-span-2 flex gap-1 items-center">
              <label className="text-sm font-semibold w-28">Address line 1</label>
              <input
                name="ro_address1"
                value={form.ro_address1}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input"
              />

            </div>

            <div className="md:col-span-2 flex gap-1 items-center">
              <label className="text-sm font-semibold  w-28">Address line 2</label>
              <input
                name="ro_address2"
                value={form.ro_address2}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input"
              />

            </div>

            <div className=" flex gap-1 items-center">
              <label className="text-sm font-semibold w-40">Country</label>
              <select  name="ro_country" required value={form.ro_country} onChange={handleChange} className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input bg-white font-semibold" >
                <option value="">Choose</option>
                {COUNTRIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

            </div>

            <div className=" flex gap-1 items-center">
              <label className="text-sm font-semibold w-40">State</label>
              <select  name="ro_state" required value={form.ro_state} onChange={handleChange} className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input bg-white font-semibold" >
                <option value="">Choose</option>

              {INDIA_STATES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
              </select>

            </div>

            <div className=" flex gap-1 items-center">
              <label className="text-sm font-semibold w-40">City</label>
              <input
                name="ro_city" required
                value={form.ro_city}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input"
              />

            </div>

            <div className=" flex gap-1 items-center">
              <label className="text-sm font-semibold w-40">PIN</label>
              <input
              name="ro_pin" required
              value={form.ro_pin}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input"
            />

            </div>
            
             
           
          </div>
      </section>

      
       {/* GENERAL INFO */}
        <section className="bg-white p-5 rounded-xl shadow-sm border">
          <h2 className="font-bold mb-4 text-[16px]">General Info</h2>

          <div className="space-y-4">

            {/* Default Stock Valuation */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="font-medium text-sm col-span-1">
                Default Stock Valuation
              </label>

              <select   name="stock_valuation" value={form.stock_valuation}   onChange={handleChange}
                className="col-span-3 border rounded-md px-3 py-2 border-[#cbd0dd] focus-input bg-white font-semibold"
                defaultValue="AVG"
              >
                <option value="AVG">AVG COST</option>
                <option value="FIFO">FIFO</option>
                <option value="LIFO">LIFO</option>
              </select>
            </div>

            {/* Industry Type */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="font-medium text-sm col-span-1">
                Industry Type
              </label>

              <select   name="industry_type" value={form.industry_type} onChange={handleChange} className="col-span-3 border rounded-md px-3 py-2 border-[#cbd0dd] focus-input bg-white font-semibold">
                <option value="">Select</option>
              {INDUSTRY_TYPES.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}

              </select>

            </div>

            {/* Nature of Work */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="font-medium text-sm col-span-1">
                Nature of Work
              </label>

              <select  name="nature_of_work"   value={form.nature_of_work} onChange={handleChange} className="col-span-3 border rounded-md px-3 py-2 border-[#cbd0dd] focus-input bg-white font-semibold">
              <option value="">Select</option>
             {NATURE_OF_WORK.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}

              </select>

            </div>

          </div>
        </section>


         {/* Co.  ADDRESS */}
      <section className="bg-white p-5 rounded-xl shadow-sm border border-[#cbd0dd] focus-input">
            <h2 className="font-bold text-[16px] mb-2">Co. Address</h2>
          
       

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="md:col-span-2 flex gap-1 items-center">
              <label className="text-sm font-semibold w-28">Address line 1</label>
              <input   name="co_address1" value={form.co_address1} onChange={handleChange} className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input" />
            </div>

            <div className="md:col-span-2 flex gap-1 items-center">
              <label className="text-sm font-semibold  w-28">Address line 2</label>
              <input   name="co_address2"
                value={form.co_address2}
                onChange={handleChange}  className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input" />
            </div>

            <div className=" flex gap-1 items-center">
              <label className="text-sm font-semibold w-40">Country</label>
              <select   name="co_country" required value={form.co_country}  onChange={handleChange} className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input bg-white font-semibold" >
               <option value="">Choose</option>
              {COUNTRIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            </div>

            <div className=" flex gap-1 items-center">
              <label className="text-sm font-semibold w-40">State</label>
              <select   name="co_state" required value={form.co_state} onChange={handleChange} className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input bg-white font-semibold">
                 <option value="">Choose</option>

                  {INDIA_STATES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
              </select>

            </div>

            <div className=" flex gap-1 items-center">
              <label className="text-sm font-semibold w-40">City</label>
           <input
              name="co_city" required
              value={form.co_city}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input"
            />

            </div>

            <div className=" flex gap-1 items-center">
              <label className="text-sm font-semibold w-40">PIN</label>
            <input
              name="co_pin" required
              value={form.co_pin}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input"
            />

            </div>
            
          </div>
      </section>

     


      </div>

      {/* BUTTONS */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          type="submit"
          onClick={handleSave}
          className="px-6 py-2.5 bg-primary text-white rounded-md font-bold text-tiny "
        >
          SAVE
        </button>


        <button className="px-6 py-2.5 bg-gray-900 text-white rounded-md font-bold text-tiny">
          QUIT
        </button>
      </div>

    </form>
    </div>
  );
};

export default AddCompany;
