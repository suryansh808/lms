import React from 'react';

const FlexiblePaymentOption = () => {
  return (
    <div>
       <section className="py-[60px] px-[10px]">
          <div className="container mx-auto">
            <h1 data-aos="fade-up"  className="text-center font-extrabold text-[#f15b29] mb-8" >  | Flexible Payment Options </h1>
            <div data-aos="fade-up" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
                <div className="bg-[#ffffff11] drop-shadow-md overflow-hidden shadow-lg rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl" >
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-2xl font-bold text-[#eee]">
                    Installments
                    </h3>
                    <p className="mt-2 text-sm text-[#eee]">
                    Learning is now more accessible than ever. With our flexible EMI options, you can break down the cost of your course into manageable payments. Choose a plan that fits your budget and schedule, and focus on mastering new skills without worrying about the financial burden.
                    </p>
                    <p>
                        <span className="text-[#f15b29] font-bold">Note:</span> To know more about installment queries connent with us <br /> <a href="https://wa.me/919380736449" target="_blank"><i class="fa fa-whatsapp text-green-800 text-3xl mr-1" aria-hidden="true"></i></a> <a className='' href="tel:+91 93807 36449"><i class="fa fa-phone text-blue-800 text-3xl" aria-hidden="true"></i> +91 93807 36449</a>
                    </p>
                  </div>
                </div>
                <div className="bg-[#ffffff11] drop-shadow-md overflow-hidden shadow-lg rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl" >
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-2xl font-bold text-[#eee]">
                    Full Payment
                    </h3>
                    <p className="mt-2 text-sm text-[#eee]">
                    Invest in your future with a one-time payment that grants you lifetime access to all course materials. No recurring fees or hidden costs—just seamless, uninterrupted learning. Plus, enjoy additional savings with this all-inclusive option, ensuring you get the most value for your education.
                    </p>
                  </div>
                </div>
            </div>
          </div>
        </section>
    </div>
  )
}

export default FlexiblePaymentOption;
