import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen flex justify-center p-6">
      <div className="w-full max-w-4xl p-10 rounded-2xl shadow-xl border-4 border-[#06B6D4]">
        <h1 className="text-4xl font-extrabold text-center text-[#06B6D4] mb-4">
          📜 Terms & Conditions
        </h1>
        <p className="text-center text-sm">Last Updated: February 2025</p>

        {/* Section 1 */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-[#06B6D4] flex items-center">
            1️⃣ User Responsibilities
          </h2>
          <ul className="list-disc ml-6 mt-3 space-y-2">
            <li>All assignments must be original and plagiarism-free.</li>
            <li>Follow the submission guidelines and deadlines strictly.</li>
            <li>Use respectful and professional language in all communications.</li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-[#06B6D4] flex items-center">
            2️⃣ Plagiarism & Academic Integrity
          </h2>
          <p className="mt-3">
            Plagiarism is strictly prohibited. Submissions will be checked, and violations may lead to rejection or penalties.
          </p>
        </div>

        {/* Section 3 */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-[#06B6D4] flex items-center">
            3️⃣ Submission Guidelines
          </h2>
          <ul className="list-disc ml-6 mt-3 space-y-2">
            <li>Accepted formats: PDF, DOCX, or TXT.</li>
            <li>Ensure your submission is virus-free and properly formatted.</li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-[#06B6D4] flex items-center">
            4️⃣ Deadlines & Late Submission
          </h2>
          <p className="mt-3">
            Late submissions may result in penalties unless an extension is granted for valid reasons.
          </p>
        </div>

        {/* Section 5 */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-[#06B6D4] flex items-center">
            5️⃣ Privacy & Security
          </h2>
          <p className="mt-3">
            User data is securely stored and will not be shared with third parties.
          </p>
        </div>

        {/* Section 6 */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-[#06B6D4] flex items-center">
            6️⃣ Contact & Support
          </h2>
          <p className="mt-3">
            📧 Email: <a href="mailto:sadiaafrinmim660@gmail.com" className="text-[#06B6D4] font-semibold">sadiaafrinmim660@gmail.com</a>  
            <br />
            📞 Phone: <span className="text-[#06B6D4] font-semibold">+123-456-7890</span>
          </p>
        </div>

        {/* Accept Button */}
        <div className="mt-8 text-center">
          <button className="px-6 py-3 text-white bg-[#06B6D4] hover:bg-[#0284a1] transition-all duration-300 rounded-lg shadow-lg">
            Accept & Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
