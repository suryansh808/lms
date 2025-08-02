const ReferAndEarn = () => {
  return (
    <div id="refer-and-earn" className="refer-and-earn">
        <div className="container-refer-and-earn">
            <div className="refer-and-earn-content">
                <h2>Refer Friends. Empower Careers. Get Rewarded!</h2>
                <p>Earn up to ₹700 for every successful referral based on your friend’s enrollment amount.</p>
                 <div className="btn">
                  <button className="refer-button">Refer Now</button>
                  <button className="eligible-button">View Eligible Programs</button>
                 </div>
            </div>
        </div>

        <div className="container_How_It_Works">
           <div className="how_it_works_content">
                <h2>How It Works</h2>
                 <div>
                    <div className="step">
                        <h3><i class="fa fa-user-plus" aria-hidden="true"></i> Refer Your Friend</h3>
                        <p>Share the form and invite friends.</p> 
                    </div>
                    <div className="step">
                        <h3><i class="fa fa-users" aria-hidden="true"></i> Friend Enrolls</h3>
                        <p>Friend joins an online course.</p> 
                    </div>
                    <div className="step">
                        <h3><i class="fa fa-money" aria-hidden="true"></i> You Get Paid</h3>
                        <p>Get reward based on enrollment fee.</p> 
                    </div>
                 </div>
           </div>
        </div>
    </div>
  )
}

export default ReferAndEarn;
