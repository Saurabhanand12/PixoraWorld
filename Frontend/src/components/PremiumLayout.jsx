import React from 'react';
import {
    Home, Compass, Bell, MessageCircle, User, Search, Settings,
    LogOut, Heart, Share2, MoreHorizontal, Bookmark, TrendingUp, Sparkles
} from 'lucide-react';

const PremiumLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white pb-16 md:pb-0 relative overflow-x-hidden">

            {/* Top Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-lg border-b border-slate-200/60 shadow-sm transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">

                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer group">
                            <div className="bg-gradient-to-tr from-indigo-500 to-purple-500 text-white p-2 rounded-xl shadow-md group-hover:shadow-lg group-hover:shadow-indigo-500/30 transition-all duration-300">
                                <Sparkles size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                            </div>
                            <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                                Pixora
                            </span>
                        </div>

                        {/* Search Bar - Hidden on small mobile */}
                        <div className="hidden sm:flex flex-1 max-w-md mx-8">
                            <div className="relative w-full group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                                    <Search size={18} />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-4 py-2 bg-slate-100/80 border-transparent rounded-2xl text-sm placeholder-slate-400 focus:bg-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 outline-none shadow-inner"
                                    placeholder="Search for inspiration, people, or tags..."
                                />
                            </div>
                        </div>

                        {/* Right actions */}
                        <div className="flex items-center gap-2 sm:gap-4">
                            <button className="relative p-2 text-slate-500 hover:text-indigo-600 bg-slate-100/50 hover:bg-indigo-50 rounded-xl transition-all duration-300">
                                <Bell size={20} />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                            </button>

                            <button className="flex items-center gap-2 p-1 pr-3 bg-white border border-slate-200 rounded-full hover:shadow-md hover:border-slate-300 transition-all duration-300 group">
                                <img
                                    className="h-8 w-8 rounded-full object-cover ring-2 ring-white shadow-sm"
                                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64"
                                    alt="User Avatar"
                                />
                                <span className="text-sm font-medium hidden md:block">Alex D.</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 flex gap-8">

                {/* Left Sidebar - Desktop */}
                <aside className="hidden md:flex flex-col w-64 flex-shrink-0 space-y-8 sticky top-24 h-[calc(100vh-8rem)]">
                    <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex flex-col gap-1">
                        <NavItem icon={<Home size={20} />} label="Home" active />
                        <NavItem icon={<Compass size={20} />} label="Explore" />
                        <NavItem icon={<MessageCircle size={20} />} label="Messages" badge="3" />
                        <NavItem icon={<Bookmark size={20} />} label="Saved" />
                        <NavItem icon={<User size={20} />} label="Profile" />
                    </div>

                    <div className="mt-auto bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-6 border border-indigo-100 relative overflow-hidden group hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-500 cursor-pointer">
                        <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
                            <Sparkles size={64} />
                        </div>
                        <h3 className="font-semibold text-indigo-900 mb-2">Upgrade to Pro</h3>
                        <p className="text-sm text-indigo-700/80 mb-4 line-clamp-2">Get access to exclusive features and analytics.</p>
                        <button className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-sm font-medium shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transform hover:-translate-y-0.5 transition-all duration-300">
                            Upgrade Now
                        </button>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 w-full max-w-2xl mx-auto space-y-6">

                    {/* Create Post Input */}
                    <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 flex gap-4 items-center">
                        <img
                            className="h-10 w-10 rounded-full object-cover shrink-0 ring-2 ring-indigo-50"
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64"
                            alt="User Avatar"
                        />
                        <div className="flex-1 bg-slate-50 hover:bg-slate-100/80 rounded-2xl px-4 py-3 cursor-text transition-colors border border-transparent hover:border-slate-200 group">
                            <span className="text-slate-400 text-sm font-medium">What's inspiring you today?</span>
                        </div>
                    </div>

                    {/* Skeleton Loader Example */}
                    <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-200 rounded-full animate-pulse"></div>
                            <div className="space-y-2 flex-1 animate-pulse">
                                <div className="h-4 bg-slate-200 rounded-md w-1/4"></div>
                                <div className="h-3 bg-slate-200 rounded-md w-1/5"></div>
                            </div>
                        </div>
                        <div className="h-56 bg-slate-100 rounded-2xl w-full animate-pulse relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                        </div>
                    </div>

                    {/* Feed Cards */}
                    <PostCard
                        name="Sarah Jenkins"
                        username="@sarahj_art"
                        avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64"
                        image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
                        content="Just finished setting up my new workspace. Absolutely loving the natural light here! ✨ #workspacegoals #design #minimalism"
                        likes="2.4k"
                        comments="142"
                    />
                    <PostCard
                        name="David Chen"
                        username="@chen_codes"
                        avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64"
                        image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
                        content="Late night coding sessions are always better with a dark mode IDE and a strong cup of coffee. ☕️🚀 Building something awesome!"
                        likes="1.8k"
                        comments="89"
                    />

                    <div className="pb-8 pt-4 text-center text-slate-400 text-sm font-medium">
                        You're all caught up! 🎉
                    </div>
                </main>

                {/* Right Sidebar - Desktop */}
                <aside className="hidden lg:block w-72 flex-shrink-0 space-y-6 sticky top-24 h-[calc(100vh-8rem)]">
                    <div className="bg-white rounded-3xl p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-slate-800 border-b-2 border-transparent hover:border-indigo-100 transition-colors cursor-pointer">Suggested for you</h3>
                            <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700 transition-colors">See All</button>
                        </div>
                        <div className="space-y-4">
                            <SuggestedUser name="Elena R." handle="@elena_creates" avatar="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=64&h=64" />
                            <SuggestedUser name="Marcus V." handle="@marcus_v" avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=64&h=64" />
                            <SuggestedUser name="Diana Prince" handle="@diana.ux" avatar="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=64&h=64" />
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
                        <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <TrendingUp size={18} className="text-rose-500" /> Trending Topics
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {['UIUXDesign', 'WebDev', 'TailwindCSS', 'ReactJS', 'StartupLife', 'Innovation'].map(tag => (
                                <span key={tag} className="px-3 py-1.5 bg-slate-50 border border-slate-100 text-slate-600 rounded-xl text-xs font-medium hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 cursor-pointer transition-all duration-300">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <footer className="px-4 text-xs text-slate-400 space-y-3">
                        <div className="flex gap-x-3 gap-y-1 flex-wrap font-medium">
                            <span className="hover:text-slate-600 cursor-pointer transition-colors">About</span>
                            <span className="hover:text-slate-600 cursor-pointer transition-colors">Help</span>
                            <span className="hover:text-slate-600 cursor-pointer transition-colors">Terms</span>
                            <span className="hover:text-slate-600 cursor-pointer transition-colors">Privacy</span>
                            <span className="hover:text-slate-600 cursor-pointer transition-colors">Careers</span>
                        </div>
                        <p>© 2026 Pixora App</p>
                    </footer>
                </aside>
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-slate-200/60 pb-safe">
                <div className="flex justify-around items-center h-16 px-2">
                    <MobileNavItem icon={<Home size={24} />} active />
                    <MobileNavItem icon={<Search size={24} />} />
                    <div className="relative -top-6">
                        <button className="w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all duration-300 border-4 border-slate-50">
                            <Sparkles size={24} />
                        </button>
                    </div>
                    <MobileNavItem icon={<Bell size={24} />} badge />
                    <MobileNavItem icon={<User size={24} />} />
                </div>
            </div>

        </div>
    );
};

/* --- Sub Components --- */

const NavItem = ({ icon, label, active, badge }) => (
    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group
    ${active
            ? 'bg-indigo-50/80 text-indigo-700 font-semibold shadow-sm border border-indigo-100/50'
            : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600 border border-transparent'}`
    }>
        <div className={`${active ? 'scale-110 text-indigo-600' : 'text-slate-500 group-hover:scale-110 group-hover:text-indigo-500'} transition-all duration-300`}>
            {icon}
        </div>
        <span className="text-[15px]">{label}</span>
        {badge && (
            <span className="ml-auto bg-gradient-to-r from-rose-400 to-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                {badge}
            </span>
        )}
    </button>
);

const MobileNavItem = ({ icon, active, badge }) => (
    <button className={`relative p-3 rounded-2xl transition-all duration-300
    ${active ? 'text-indigo-600 bg-indigo-50 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-500'}`
    }>
        <div className={`${active ? 'scale-110' : 'scale-100'} transition-transform duration-300`}>
            {icon}
        </div>
        {badge && <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>}
    </button>
);

const PostCard = ({ name, username, avatar, image, content, likes, comments }) => (
    <article className="bg-white rounded-3xl p-4 sm:p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all duration-500 border border-slate-100 group">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 cursor-pointer">
                <img className="w-10 h-10 rounded-full object-cover ring-2 ring-transparent group-hover:ring-indigo-100 transition-all duration-300" src={avatar} alt={name} />
                <div>
                    <h4 className="font-semibold text-slate-800 text-[15px] leading-tight group-hover:text-indigo-600 transition-colors">{name}</h4>
                    <span className="text-slate-500 text-[13px]">{username} • 2h</span>
                </div>
            </div>
            <button className="text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-50 transition-colors">
                <MoreHorizontal size={20} />
            </button>
        </div>

        {/* Content */}
        <p className="text-slate-700 text-[15px] mb-4 leading-relaxed">
            {content}
        </p>

        {/* Image */}
        <div className="rounded-2xl overflow-hidden mb-4 bg-slate-100 relative group/img cursor-pointer">
            <img
                src={image}
                alt="Post content"
                className="w-full h-auto max-h-[450px] object-cover group-hover/img:scale-[1.02] transition-transform duration-700 ease-out"
            />
            {/* Overlay gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 p-2 text-slate-500 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all duration-300 group/btn">
                    <Heart size={22} className="group-hover/btn:scale-110 active:scale-95 transition-transform" />
                    <span className="text-sm font-medium">{likes}</span>
                </button>
                <button className="flex items-center gap-1.5 p-2 text-slate-500 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all duration-300 group/btn">
                    <MessageCircle size={22} className="group-hover/btn:scale-110 active:scale-95 transition-transform" />
                    <span className="text-sm font-medium">{comments}</span>
                </button>
            </div>
            <div className="flex items-center gap-1">
                <button className="p-2 text-slate-500 hover:text-indigo-500 hover:bg-indigo-50 rounded-xl transition-all duration-300 group/btn tooltip-trigger">
                    <Share2 size={22} className="group-hover/btn:scale-110 active:scale-95 transition-transform" />
                </button>
                <button className="p-2 text-slate-500 hover:text-amber-500 hover:bg-amber-50 rounded-xl transition-all duration-300 group/btn">
                    <Bookmark size={22} className="group-hover/btn:scale-110 active:scale-95 transition-transform" />
                </button>
            </div>
        </div>
    </article>
);

const SuggestedUser = ({ name, handle, avatar }) => (
    <div className="flex items-center justify-between group cursor-pointer p-2 -mx-2 rounded-2xl hover:bg-slate-50 transition-colors">
        <div className="flex items-center gap-3">
            <img className="w-10 h-10 rounded-full object-cover ring-2 ring-transparent group-hover:ring-indigo-100 transition-all duration-300" src={avatar} alt={name} />
            <div>
                <h4 className="font-semibold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">{name}</h4>
                <p className="text-slate-500 text-[13px]">{handle}</p>
            </div>
        </div>
        <button className="text-xs font-semibold px-4 py-1.5 bg-white border border-slate-200 shadow-sm text-slate-700 hover:bg-slate-800 hover:text-white hover:border-slate-800 rounded-full transition-all duration-300">
            Follow
        </button>
    </div>
);

export default PremiumLayout;
