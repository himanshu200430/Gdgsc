import React from "react";
import "./MeetTeam.css";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";

const MeetTeam = () => {
  const teams = [
    {
      name: "Office Bearers",
      color: "team-gold",
      members: [
        {
          name: "Krish Kapoor",
          role: "Chairman",
          linkedin: "https://www.linkedin.com/in/krish-kapoor-b905ab28b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          instagram: "https://www.instagram.com/__krishhxx?igsh=bHVteGFqb2FmcTQ5",
          github: "https://github.com/KriKaP",
          photo: "images/meetteam/Office Bearers/Chairman/krish.jpg",
        },
        {
          name: "Anant Kumar Sinha",
          role: "Vice-Chairman",
          linkedin: "https://www.linkedin.com/in/anant-kumar-sinha-3742971ab/",
          github: "https://github.com/SoJaoAnant",
          instagram: "https://www.instagram.com/so_jao_anant/",
          photo: "images/meetteam/Office Bearers/Vice-Chairman/Anant.jpg",
        },
        {
          name: "Nishant",
          role: "General Secretary",
          linkedin: "https://www.linkedin.com/in/nishant-38aa9b24b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          instagram: "https://www.instagram.com/_nishant__cifrado?igsh=YzVwdWg2em0ycGQw",
          github: "https://github.com/Frenzy16327",
          photo: "images/meetteam/Office Bearers/General Secretary/Nishant1.jpg",
        },
        {
          name: "Ravi Garg",
          role: "Joint Secretary",
          linkedin: "https://www.linkedin.com/in/ravigarg10/",
          instagram: "https://www.instagram.com/ravigarg_10/",
          github: "#",
          photo: "images/meetteam/Office Bearers/Joint Secretary/Ravi garg.jpg",
        },
      ],
    },
    {
      name: "Core Team",
      color: "team-white",
      members: [
         {
          name: "Vedaant Budakoti",
          role: "Game Dev",
          linkedin: "https://www.linkedin.com/in/vedaantbudakoti/",
          instagram: "https://www.instagram.com/vedaant._.vbd/",
          github: "https://github.com/Vedaant-VBD",
          photo:"images/meetteam/Team Unreal/Vedaant Budakoti1.jpg",
        },
        {
          name: "Kavya Sharma",
          role: "3D Design",
          linkedin: "https://in.linkedin.com/in/kavya-sharma-6b42ba291",
          instagram: "https://www.instagram.com/sharma6814kavya?igsh=bTB6cGhvOTJwZHd3",
          github: "https://github.com/Kavya6814",
          photo:"images/meetteam/Team Blender/KavyaSharma1.jpg",
        },
        {
          name: "Deepali Goyal",
          role: "PR",
          linkedin: "https://www.linkedin.com/in/deepali-goyal-4724ba325",
          instagram: "https://www.instagram.com/achaokayydeepaliii/",
          github: "https://github.com/deepaligoyal04",
          photo:"images/meetteam/Team Outreach/Deepali Goyal (1).jpg",
        },
        {
          name: "Simant Pandit",
          role: "Game Dev",
          linkedin: "https://www.linkedin.com/in/simant-pandit-634a13312",
          instagram: "https://www.instagram.com/simant._pandit/",
          github: "https://github.com/Patagobhi",
          photo:"images/meetteam/Team Unreal/Simant Pandit1.jpg",
        },
        {
          name: "Shubham Singh",
          role: "Game Dev",
          linkedin: "#",
          instagram: "#",
          github: "https://github.com/Shubhamkira10",
          photo:"images/meetteam/Team Unreal/Shubham1.jpg",
        },
        {
          name: "Prashant Baliyan",
          role: "PR",
          linkedin: "#",
          instagram: "https://www.instagram.com/p.baliyan_?igsh=Nng2cWV3NjE1MzV4",
          github: "#",
          photo:"images/meetteam/Team Outreach/prashant.jpg",
        },
        {
          name: "Aditya Singh",
          role: "Design",
          linkedin: "https://www.linkedin.com/in/its-adityasingh/",
          instagram: "https://www.instagram.com/k_aditya_singh/",
          github: "https://github.com/its-adityasingh",
          photo:"images/meetteam/Team Prototype/Aditya Singh.jpeg",
        },
        {
          name: "Dev Nath",
          role: "Design",
          linkedin: "https://www.linkedin.com/in/dev-nath-1093a432a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          instagram: "https://www.instagram.com/nuke.psd?igsh=YTYzbWNiN2FwenNz",
          github: "#",
          photo:"images/meetteam/Team Prototype/Dev Nath (1).jpg",
        },
        {
          name: "Annanya Gera",
          role: "Events",
          linkedin: "http://www.linkedin.com/in/annanya-gera",
          instagram: "#",
          github: "#",
          photo:"images/meetteam/Team Overwatch/Annanya Gera1.jpg",
        },
        {
          name: "Raghav Gupta",
          role: "Events",
          linkedin: "https://www.linkedin.com/in/raghav-gupta-bb4757323/",
          instagram: "#",
          github: "#",
          photo:"images/meetteam/Team Overwatch/RG.png",
        },
        
      ],
    },
    {
      name: "Team Unreal",
      color: "team-red",
      members: [
       
        {
          name: "Mohammad",
          role: "Game Dev",
          linkedin: "https://www.linkedin.com/in/mohammad-a463bb291",
          instagram: "https://www.instagram.com/iam.moh4mmad",
          github: "https://github.com/Mohammad-416",
          photo:"images/meetteam/Team Unreal/Mohammad1.jpg",
        },
        
        
        {
          name: "Aniket Sharma",
          role: "Game Dev",
          linkedin: "http://www.linkedin.com/in/aniket-sharma-531880281",
          instagram: "https://www.instagram.com/imightneedalawyer?igsh=MTh0OGxqYXlicW0yZA==",
          github: "https://github.com/AniketSharma711",
          photo:"images/meetteam/Team Unreal/Aniket Sharma1.png",
        },
        
        {
          name: "Bhavya Batra",
          role: "Game Dev",
          linkedin: "http://www.linkedin.com/in/bhavya-batra-5718692b4",
          instagram: "https://www.instagram.com/batrabhavya_05/",
          github: "https://github.com/BhavyaBatra05",
          photo:"images/meetteam/Team Unreal/bhavya.jpg",
        },
        
        {
          name: "Vaibhav Veerwaal",
          role: "Game Dev",
          linkedin: "http://www.linkedin.com/in/vaibhav-veerwaal-140465288",
          instagram: "#",
          github: "https://github.com/Va1bhav512",
          photo:"images/meetteam/Team Unreal/Vaibhav Veerwaal1.jpg",
        },
        {
          name: "Navneet Guglani",
          role: "Game Dev",
          linkedin: "https://www.linkedin.com/in/navneet-guglani-1192b9291?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          instagram: "https://www.instagram.com/navneet_guglani?igsh=MWNtdGNxNHhzaGVvcQ==",
          github: "https://github.com/Navneet1710",
          photo:"images/meetteam/Team Unreal/Navneet(1).jpg",
        },
        {
          name: "Harshit Rana",
          role: "Game Dev",
          linkedin: "http://www.linkedin.com/in/harshit-rana-8b40b6324",
          instagram: "https://www.instagram.com/henry0fskalitz/",
          github: "https://github.com/yuriold95",
          photo:"images/meetteam/Team Unreal/Harshit Rana1.jpg",
        },
      ],
    },
    {
      name: "Team Blender",
      color: "team-green",
      members: [
        
        {
          name: "Saksham Aggarwal",
          role: "3D Design",
          linkedin: "https://www.linkedin.com/in/saksham-kumar-aggarwal-769bb8308",
          instagram: "https://www.instagram.com/m1551ngn0?igsh=MW1jYjBzaWYyZ3UzMQ==",
          github: "https://github.com/M1ss1ngN0",
          photo:"images/meetteam/Team Blender/Saksham.jpg",
        },
        {
          name: "Garv Jaiswal",
          role: "3D Design",
          linkedin: "https://www.linkedin.com/in/garv-jaiswal-2b353831a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          instagram: "#",
          github: "https://github.com/jaiswalGARV",
          photo:"images/meetteam/Team Blender/garv.jpg",
        },
        {
          name: "Rahul",
          role: "3D Design",
          linkedin: "https://www.linkedin.com/in/rahul-mahour-82a5a6355",
          instagram: "https://www.instagram.com/ayoorahul?igsh=MW1ha21qcjMyYWs=",
          github: "https://github.com/Diablo109",
          photo:"images/meetteam/Team Blender/Rahul.jpg",
        },
        {
          name: "Ananya Jain",
          role: "3D Design",
          linkedin: "https://www.linkedin.com/in/ananya-jain-092419320?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          instagram: "https://www.instagram.com/_annjayy/profilecard/?igsh=cmc5MnFvOG43b3Iy",
          github: "https://github.com/Ananya-jainn",
          photo:"images/meetteam/Team Blender/Ananya jain (1).jpg",
        },
        {
          name: "Raghav Bhatia",
          role: "3D Design",
          linkedin: "https://www.linkedin.com/in/raghav-bhatia-775854214/",
          instagram: "https://www.instagram.com/raghavbhatia.23/?hl=en",
          github: "https://github.com/raghav-2310",
          photo:"images/meetteam/Team Blender/Raghav Bhatia.jpeg",
        },
        
      ],
    },
    {
      name: "Team Scratch",
      color: "team-blue",
      members: [
        {
          name: "Mayank",
          role: "WebDev",
          linkedin: "https://www.linkedin.com/in/mayank9918/",
          instagram: "#",
          github: "https://github.com/Mayank-9918",
          photo: "images/meetteam/Team scratch_/mayank.jpg",
        },
        {
          name: "Anmol Pandit",
          role: "WebDev",
          linkedin: "https://www.linkedin.com/in/akpcoder076/",
          instagram: "https://www.instagram.com/anmolprajapati2004?igsh=NXBuZ2x3ZmoybHpj",
          github: "https://github.com/ANMOLPANDIT38",
          photo: "images/meetteam/Team scratch_/Anmolkp1.jpg",
        },
        {
          name: "Chirag Sharma",
          role: "WebDev",
          linkedin: "https://www.linkedin.com/in/chirag-sharma-318404292/",
          instagram: "#",
          github: "https://github.com/chirags1725/",
          photo: "images/meetteam/Team scratch_/chirag.jpg",
        },
        
        {
          name: "Rishit Kadha",
          role: "WebDev",
          linkedin: "#",
          instagram: "https://www.instagram.com/rishit_kadha_?igsh=eGl3ZWw0cGx2ZWty",
          github: "https://github.com/rishit-kadha",
          photo:"images/meetteam/Team scratch_/Rishit_Kadha1.jpg",
        },
        {
          name: "Samriddhi Bisht",
          role: "WebDev",
          linkedin: "https://in.linkedin.com/in/samriddhi-bisht-370499290",
          instagram: "https://www.instagram.com/samriddhi_sb_?igsh=dWFiMWdzaDlrMzU1&utm_source=qr",
          github: "#",
          photo:"images/meetteam/Team scratch_/Samriddhi Bisht.jpeg",
        },
      ],
    },
    {
      name: "Team OverWatch",
      color: "team-cyan",
      members: [
        {
          name: "Shivam Raj",
          role: "Events",
          linkedin: "https://www.linkedin.com/in/sr-on-ln",
          instagram: "#",
          github: "https://github.com/shivamrajgit",
          photo:"images/meetteam/Team Overwatch/Shivam Raj1.jpg",
        },
        {
          name: "Abubakar Siddiqui",
          role: "Events",
          linkedin: "#",
          instagram: "#",
          github: "#",
          photo:"images/meetteam/Team Overwatch/Abubakar overwatch_11.jpg",
        },
        
        
        {
          name: "Abhinav Mishra",
          role: "Events",
          linkedin: "https://www.linkedin.com/in/abhinav-mishra-0a20842b6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          instagram: "https://www.instagram.com/abhinav.3028?igsh=MWczOHFidDg4cmk1dA==",
          github: "#",
          photo:"images/meetteam/Team Overwatch/abhinav.jpg",
        },
        {
          name: "Shivam Kumar",
          role: "Events",
          linkedin: "https://www.linkedin.com/in/shivam-kumar-228648352?trk=contact-info",
          instagram: "https://www.instagram.com/0shivam04?igsh=dDN3OXpxdjNxbmx6",
          github: "#",
          photo:"images/meetteam/Team Overwatch/shivam.jpg",
        },
        {
          name: "Love Kumar",
          role: "Events",
          linkedin: "https://www.linkedin.com/in/love-kumar-a98269348?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          instagram: "https://www.instagram.com/choudhary_love_dhama?igsh=ZWt3emRzbnBjdzA1",
          github: "#",
          photo:"images/meetteam/Team Overwatch/Love (1).webp",
        },
        {
          name: "Bijender Singh",
          role: "Events",
          linkedin: "https://www.linkedin.com/in/bijender7singh/",
          instagram: "#",
          github: "https://github.com/bijendersingh-7",
          photo:"",
        },
      ],
    },
    {
      name: "Team OutReach",
      color: "team-orange",
      members: [
        
        {
          name: "Nishchay Hiteshi",
          role: "PR",
          linkedin: "https://www.linkedin.com/in/nishchay-hiteshi",
          instagram: "https://www.instagram.com/nishchayhiteshi?igsh=cHl0ejY3ZmJ6cDFu",
          github: "#",
          photo:"images/meetteam/Team Outreach/Nishchay (1).jpg",
        },
        {
          name: "Pradeepika",
          role: "PR",
          linkedin: "https://www.linkedin.com/in/pradeepika-upadhyay-669ba0362",
          instagram: "https://www.instagram.com/heyitsmepradeepika?igsh=aDk1cXV3c2NvOGRi",
          github: "",
          photo:"images/meetteam/Team Outreach/Pradeepika Upadhyay_.webp",
        },
        {
          name: "Keshav Kumar",
          role: "PR",
          linkedin: "https://www.linkedin.com/in/keshav-kumar-b92846325?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          instagram: "https://www.instagram.com/keshav_bhardwaj.1/profilecard/?igsh=N212OGV5ZDNyMDdy",
          github: "#",
          photo:"images/meetteam/Team Outreach/Keshav❤️👻/keshav.jpg",
        },
        
        {
          name: "Aryan Puri",
          role: "PR",
          linkedin: "https://www.linkedin.com/in/aryan-puri01/",
          instagram: "https://www.instagram.com/puri.aryan.165/",
          github: "https://github.com/Aryansoxyboiiii",
          photo:"images/meetteam/Team Outreach/Aryan puri/IMG_20250129_165331_518.webp",
        },
        {
          name: "Ojaswit Shukla",
          role: "PR",
          linkedin: "https://www.linkedin.com/in/ojaswit-shukla-191633327/",
          instagram: "#",
          github: "#",
          photo:"images/meetteam/Team Outreach/ojaswit.jpg",
        },
        {
          name: "Mudit Garg",
          role: "PR",
          linkedin: "https://www.linkedin.com/in/mudit-garg-46ab00315?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          instagram: "https://www.instagram.com/mudit_garg5545/profilecard/?igsh=MWkxeWduMXF5eTA1aA==",
          github: "https://github.com/MuditGarg789",
          photo:"images/meetteam/Team Outreach/Mudit Garg (1).jpg",
        },
        {
          name: "Ojaswini Fauzdar",
          role: "PR",
          linkedin: "https://www.linkedin.com/in/ojaswini-fauzdar-00751425a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          instagram: "https://www.instagram.com/ojazzwini_?igsh=MWYycXlyc2owYW16OA==",
          github: "https://github.com/Ojaswini-Fauzdar",
          photo:"images/meetteam/Team Outreach/Ojaswini.jpg",
        },
        {
          name: "Prisha Saharan",
          role: "PR",
          linkedin: "https://www.linkedin.com/in/prisha-saharan-a83947335/",
          instagram: "https://www.instagram.com/kookie_20_06/",
          github: "#",
          photo:"images/meetteam/Team Outreach/Prisha1.png",
        },
        // {
        //   name: "Vansh Gautam",
        //   role: "PR",
        //   linkedin: "https://www.linkedin.com/in/vanshgautam33/",
        //   instagram: "https://www.instagram.com/vaxsh._xx/",
        //   github: "https://github.com/VanshGautamDev",
        //   photo:"images/meetteam/Team Outreach/Vansh Gautam1.jpg",
        // },
      ],
    },
    {
      name: "Team Prototype",
      color: "team-pink",
      members: [
        
        {
          name: "Sambhav Arora",
          role: "Design",
          linkedin: "https://www.linkedin.com/in/sambhavarora059/",
          instagram: "https://www.instagram.com/sambhav_arora2006/",
          github: "https://github.com/ThatHumanGuy",
          photo:"images/meetteam/Team Prototype/sambhav1.jpg",
        },
        {
          name: "Dhwani Verma",
          role: "Design",
          linkedin: "https://www.linkedin.com/in/dhwani-verma-b50152309?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          instagram: "https://www.instagram.com/dhwanii.24?igsh=MTV2Z2hqYXB0Z3V5OQ==",
          github: "https://github.com/dhwani-verma",
          photo:"images/meetteam/Team Prototype/Dhwani Verma1.jpg",
        },
        // {
        //   name: "Abhiram Sridhar",
        //   role: "Design",
        //   linkedin: "https://www.linkedin.com/in/abhiram-r-sridhar-88a8002b5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        //   instagram: "https://www.instagram.com/abhiramr_sridhar?igsh=MXh4M2lwbWk3eW9naA==",
        //   github: "#",
        //   photo:"images/meetteam/Team Prototype/Abhiram R Sridhar1.jpg",
        // },
        {
          name: "Daksh Tekwani",
          role: "Design",
          linkedin: "https://www.linkedin.com/in/daksh-tekwani-1b280234a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          instagram: "#",
          github: "#",
          photo:"",
        },
        {
          name: "Priya Saha",
          role: "Design",
          linkedin: "http://www.linkedin.com/in/priyasahaggsipu",
          instagram: "#",
          github: "https://github.com/PriyaSaha1234",
          photo:"images/meetteam/Team Prototype/priya.jpg",
        },
        {
          name: "Vaidehi Lodhi",
          role: "Design",
          linkedin: "https://www.linkedin.com/in/vaidehi-lodhi/",
          instagram: "https://www.instagram.com/vaidehi.lodhi/",
          github: "https://github.com/VaidehiLodhi",
          photo:"images/meetteam/Team Prototype/vaidehi.jpg",
        },
      ],
    },
    {
      name: "Team Catalyst",
      color: "team-purple",
      members: [
        {
          name: "Hari Om Panchal",
          role: "Research",
          linkedin: "https://www.linkedin.com/in/hari-om-panchal?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          instagram: "#",
          github: "https://github.com/hariom-panchal",
          photo:"images/meetteam/Team catalyst_/Hari Om Panchal1.jpg",
        },
        {
          name: "Tejas Jain",
          role: "Research",
          linkedin: "https://www.linkedin.com/in/tejas-jain-03801b339/",
          instagram: "https://www.instagram.com/tejas_jain_10/",
          github: "https://github.com/TejasJain970",
          photo:"images/meetteam/Team catalyst_/Tejas Jain1.jpg",
        },
        {
          name: "Pranjal Rathore",
          role: "Research",
          linkedin: "https://www.linkedin.com/in/pranjalrathore",
          instagram: "https://www.instagram.com/rathore__pranjal",
          github: "http://www.github.com/rathorepranjal",
          photo:"images/meetteam/Team catalyst_/Pranjal Rathore_/PranjalRathore.jpg",
        },
        {
          name: "Sparsh Goel",
          role: "Research",
          linkedin: "https://www.linkedin.com/in/sparshhhh12/",
          instagram: "https://www.instagram.com/sparshgoelll/",
          github: "#",
          photo:"images/meetteam/Team catalyst_/Sparsh Goel1.jpg",
        },
        {
          name: "Prarthna",
          role: "Research",
          linkedin: "https://www.linkedin.com/in/prarthna-%E2%9C%BF-205407350?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          instagram: "https://www.instagram.com/prarthnaa.s/",
          github: "#",
          photo:"images/meetteam/Team catalyst_/Prarthna_/prarthna.jpg",
        },
        {
          name: "Nadam",
          role: "Research",
          linkedin: "http://www.linkedin.com/in/nadam-saluja",
          instagram: "http://www.instagram.com/saluja.nadam/",
          github: "https://github.com/blastre/",
          photo:"images/meetteam/Team catalyst_/Nadam1.jpg",
        },
      ],
    },
  ];

  return (
    <section className="meet-team-section">
      <div className="content-container">
        <h2 className="section-title">
          <span className="title-text">MEET OUR TEAM</span>
        </h2>
        <div className="title-underline"></div>
        <p className="section-description">
          Our expert team is made up of creatives with technical know-how,
          strategists who think outside the box, and people who push beyond
          innovation.
        </p>

        {teams.map((team, teamIndex) => (
          <div key={teamIndex} className="team-section">
            <h2 className="team-title">
              <span className="team-title-text">{team.name}</span>
              <span className="team-title-underline"></span>
            </h2>

            <div className="team-members">
              {team.members.map((member, memberIndex) => (
                <div key={memberIndex} className={`member-card ${team.color}`}>
                  <div className="member-image-container">
                    <div className="image-wrapper">
                      {member.photo !== '' ? <img
                        src={member.photo}
                        onerror="this.onerror=null; this.src='images/meetteam/fallback-image.jpg';"
                        alt={member.name}
                        className="member-image"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/300";
                        }}
                      />:
                      <img
                        src="images/meetteam/fallback-image.jpg"
                        alt={member.name}
                        className="member-image"
                      />
                      }
                    </div>
                  </div>

                  <div className="member-info">
                    <h3 className="member-name">{member.name}</h3>
                    <p className="member-role">{member.role}</p>
                  </div>

                  <div className="member-social-links">
                    <a
                      href={member.linkedin}
                      className="social-link linkedin"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin className="social-icon" />
                    </a>
                    <a
                      href={member.instagram}
                      className="social-link instagram"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram className="social-icon" />
                    </a>
                    <a
                      href={member.github}
                      className="social-link github"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub className="social-icon" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MeetTeam;
