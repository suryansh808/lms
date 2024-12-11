import React from "react";

const Alumni = () => {
  const companies = [
    {
      logo: "https://imgs.search.brave.com/cMeR-TEzSzc3L_T_t4c0ZKSZu5B4BxkMPGrZ48urikE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4x/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvZ29vZ2xlLXMt/bG9nby8xNTAvR29v/Z2xlX0ljb25zLTA5/LTUxMi5wbmc",
    },
    {
      logo: "https://imgs.search.brave.com/lKAom1_NDD-atoVTY4C7rEOCNdeafeeVWKyvfDjD0iU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMTUvR29s/ZG1hbi1TYWNocy1M/b2dvLU5vLUJhY2tn/cm91bmQucG5n",
    },
    {
      logo: "https://imgs.search.brave.com/6-Ag3qlJQvMJgtjLvfxeckI81Yma6vlDr-PjXGnPR98/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mcmVl/cG5nbG9nby5jb20v/aW1hZ2VzL2FsbF9p/bWcvMTcxNTQ4Nzk5/OGFtYXpvbi1sb2dv/LXRyYW5zcGFyZW50/LnBuZw",
    },
    {
      logo: "https://imgs.search.brave.com/AuHEZg2fkVy-TAAeedwMUmQ-VGI6OsaGwbZzch9CuzU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jb21w/YW5pZXNsb2dvLmNv/bS9pbWcvb3JpZy9X/SVRfQklHLTBkZTJk/YzIxLnBuZz90PTE3/MjAyNDQ0OTQ",
    },
    {
      logo: "https://imgs.search.brave.com/rJav1-ddA4sbeKTy4ipls3wTkFPvFrxGi_PGMWXyUgs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy82/MjA1MThmMjRlMTYy/ZjAwMDQ4MGVkYjIu/cG5n",
    },
    {
      logo: "https://imgs.search.brave.com/0SrVHhsedWleOhtFNh7fto6Pi7OxgRZYqGYnL7_r83Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDkvTWljcm9zb2Z0/LUxvZ28tNzAweDM5/NC5wbmc",
    },
    {
      logo: "https://imgs.search.brave.com/x6B5pm1NdGcxLdcp5kt9RJFY9Su-hlGdsNcCUeJw27s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMTMvSUJN/LUxvZ28tUE5HLUlt/YWdlLnBuZw",
    },
    {
      logo: "https://imgs.search.brave.com/TkxUwSe7oaPMPcmya5Qo032wVDQipHOEV9j3AFGdoBw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9icmFu/ZGxvZ29zLm5ldC93/cC1jb250ZW50L3Vw/bG9hZHMvMjAxMy8w/My9oY2wtdGVjaG5v/bG9naWVzLXZlY3Rv/ci1sb2dvLnBuZw",
    },
    {
      logo: "https://imgs.search.brave.com/lKAom1_NDD-atoVTY4C7rEOCNdeafeeVWKyvfDjD0iU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMTUvR29s/ZG1hbi1TYWNocy1M/b2dvLU5vLUJhY2tn/cm91bmQucG5n",
    },
    {
      logo: "https://imgs.search.brave.com/6-Ag3qlJQvMJgtjLvfxeckI81Yma6vlDr-PjXGnPR98/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mcmVl/cG5nbG9nby5jb20v/aW1hZ2VzL2FsbF9p/bWcvMTcxNTQ4Nzk5/OGFtYXpvbi1sb2dv/LXRyYW5zcGFyZW50/LnBuZw",
    },
    {
      logo: "https://imgs.search.brave.com/fUo5eVYGvpsQ7_PO4Bqqv5Dex_mbgD9rSI8Q4dI7QEQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDkvT3JhY2xlLUxv/Z28tMTk5NS1QcmVz/ZW50LTcwMHgzOTQu/cG5n",
    },
    {
      logo: "https://imgs.search.brave.com/PWbZC6pkC_cX3oUse8db2Lhro3fx3wRpHtFHtcIPUr4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/LWRvd25sb2FkLmNv/bS93cC1jb250ZW50/L2RhdGEvaW1hZ2Vz/L3BuZy9Db2duaXph/bnQtbG9nby5wbmc",
    },
    {
      logo: "https://imgs.search.brave.com/S4frBX6hxMwb6U1eVgdQssA6clrQvdy8vlzW6DqNxGs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy1kb3dubG9hZC5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MTYvMDcvSmlvX2xv/Z28tNzAweDcwMC5w/bmc",
    },
    {
      logo: "https://imgs.search.brave.com/IhxIeqxtHrmF4YETLWlA1rsidL_YbIKUiwpdgusfCiQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mcmVl/bG9nb3BuZy5jb20v/aW1hZ2VzL2FsbF9p/bWcvMTY1ODk4NTYz/OWJhbmstb2YtYW1l/cmljYS1sb2dvLXRy/YW5zcGFyZW50LnBu/Zw",
    },
    {
      logo: "https://imgs.search.brave.com/jnkwIj8uz4KMb9DH5YpgWFSLBBaKWVId_HF5Lx0JL4I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9icmFu/ZHNsb2dvcy5jb20v/d3AtY29udGVudC91/cGxvYWRzL2ltYWdl/cy9kZWxvaXR0ZS1s/b2dvLnBuZw",
    },
    {
      logo: "https://imgs.search.brave.com/3PlGNnnKLySCmtp5D73_rAeA4MoRK70qh0F4N1RbQd0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9j/L2NmL0Npc2NvX2xv/Z28tMTAwMHB4LnBu/Zw",
    },
  ];

  return (
    <div id="ourAlumni">
      <div className="logos">
              {companies.map((companies, index) => (
                <div key={`${companies.id}-${index}`} className="logo_items">
                  <img
                    src={companies.logo}
                    alt="logo"
                    className="max-w-[120px] mr-20 h-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    width={120}
                    height={40}
                  />
                </div>
              ))}
            </div>
    </div>
  );
};

export default Alumni;
