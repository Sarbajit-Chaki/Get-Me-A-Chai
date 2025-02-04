# 🚀 GetMeAChai – A Next.js Crowdfunding Platform  

GetMeAChai is a **crowdfunding platform** where creators can **register, showcase their work, and receive funds** from fans and supporters. Inspired by Patreon, this platform enables content creators, artists, and influencers to monetize their audience through direct contributions.  

## 🌟 Features  
- ✅ **Creator Registration & Profile Management** – Creators can sign up, manage their profile.  
- ✅ **Secure Authentication** – Built with **Next-Auth** for seamless and secure user authentication.  
- ✅ **Supporter Contributions** – Fans can contribute to their favorite creators through **Razorpay payment gateway**.  

## 🛠️ Tech Stack  
- **Frontend:** Next.js, React.js, Tailwind CSS  
- **Backend:** Next.js API routes, MongoDB  
- **Authentication:** Next-Auth  
- **Payments:** Razorpay  
- **Deployment:** Vercel  

## 🌐 Live Demo  
🔗 [Visit CrowdfundX](https://get-me-a-chaii.vercel.app/)  

## 📌 How to Run Locally  

```bash
# Clone the repository  
git clone https://github.com/Sarbajit-chaki/Get-Me-A-Chai.git  

# Navigate to the project folder  
cd GetMeAChai  

# Install dependencies  
npm install  

# Set up environment variables in `.env.local`  
NEXTAUTH_SECRET=your-secret  
DATABASE_URL=your-mongodb-url  
RAZORPAY_KEY_ID=your-razorpay-key  
RAZORPAY_KEY_SECRET=your-razorpay-secret  

# Start the development server  
npm run dev  
