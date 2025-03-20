import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

import Button from "./Button";
import { GrGamepad } from "react-icons/gr";
import { FaBars, FaTimes } from "react-icons/fa";


const navItems = [
    "Home",
    "About",
    "Store",
    "Community",
    "News",
    "Support",
    "Account",
];

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    // State for toggling audio and visual indicator
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isIndicatorActive, setIsIndicatorActive] = useState(false);

    // Refs for audio and navigation container
    const audioElementRef = useRef(null);
    const navContainerRef = useRef(null);

    const { y: currentScrollY } = useWindowScroll();
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Toggle audio and visual indicator
    const toggleAudioIndicator = () => {
        setIsAudioPlaying((prev) => !prev);
        setIsIndicatorActive((prev) => !prev);
    };

    // Manage audio playback
    useEffect(() => {
        const audio = audioElementRef.current;
        if (isAudioPlaying) {
            audio.play();
        } else {
            audio.pause();
        }
    }, [isAudioPlaying]);

    useEffect(() => {
        if (currentScrollY === 0) {
            // Topmost position: show navbar without floating-nav
            setIsNavVisible(true);
            navContainerRef.current.classList.remove("floating-nav");
        } else if (currentScrollY > lastScrollY) {
            // Scrolling down: hide navbar and apply floating-nav
            setIsNavVisible(false);
            navContainerRef.current.classList.add("floating-nav");
        } else if (currentScrollY < lastScrollY) {
            // Scrolling up: show navbar with floating-nav
            setIsNavVisible(true);
            navContainerRef.current.classList.add("floating-nav");
        }

        setLastScrollY(currentScrollY);
    }, [currentScrollY, lastScrollY]);

    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.2,
        });
    }, [isNavVisible]);

    return (
        <div
            ref={navContainerRef}
            className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
        >
            <header className="absolute top-1/2 w-full -translate-y-1/2">
                <nav className="flex size-full items-center justify-between p-2 sm:p-4">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <img src="/vite.svg" alt="logo" className="min-w-8 sm:w-6" />
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="flex h-full items-center flex-wrap">
                        <div className="hidden md:flex h-full items-center gap-2 sm:gap-1 md:gap-2 lg:gap-6 xl:gap-8">
                            {navItems.map((item, index) => (
                                <a
                                    key={index}
                                    href={`#${item.toLowerCase()}`}
                                    className="nav-hover-btn"
                                >
                                    {item}
                                </a>
                            ))}
                        </div>


                        {/* Audio Button */}
                        <button
                            id="audio-toggle-btn"
                            onClick={toggleAudioIndicator}
                            className="ml-10 hidden md:flex items-center space-x-0.5 cursor-pointer"
                            title="Play Audio"
                        >
                            <audio ref={audioElementRef} className="hidden" src="/audio/loop.mp3" loop />
                            {[1, 2, 3, 4].map((bar) => (
                                <div
                                    key={bar}
                                    className={`indicator-line ${isIndicatorActive ? "active" : ""}`}
                                    style={{ animationDelay: `${bar * 0.1}s` }}
                                />
                            ))}
                        </button>
                    </div>

                    {/* Products Button */}
                    <a href={`#products`} className="hidden md:block">
                        <Button
                            id="product-button"
                            title="Products"
                            rightIcon={
                                <GrGamepad className="text-sm sm:text-base transition-transform duration-100 ease-in-out group-hover:rotate-12 group-hover:scale-110" />
                            }
                            containerClass="bg-blue-50 flex items-center justify-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 transition-all duration-300 ease-in-out hover:bg-gradient-to-r from-blue-400 to-pink-500 hover:text-white"
                        />
                    </a>

                    {/* Mobile Menu Toggle Button */}
                    <button
                        className="md:hidden block text-2xl text-white cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>

                    {/* Mobile Menu */}
                    {isOpen && (
                        <div className="absolute top-16 left-0 z-10 w-full bg-white shadow-md md:hidden flex flex-col items-center gap-4 py-4 rounded">

                            {/* Navigation links */}
                            {navItems.map((item, index) => (
                                <a
                                    key={index}
                                    href={`#${item.toLowerCase()}`}
                                    onClick={() => setIsOpen(false)}
                                    className="w-full text-center py-2 text-gray-700 hover:text-violet-300 transition-colors duration-300"
                                >
                                    {item}
                                </a>
                            ))}

                            {/* Products button */}
                            <a href={`#products`} className="w-full text-center flex justify-center">
                                <Button
                                    id="product-button"
                                    title="Products"
                                    rightIcon={
                                        <GrGamepad className="text-lg transition-transform duration-300 ease-in-out group-hover:rotate-12 group-hover:scale-110" />
                                    }
                                    containerClass="bg-blue-50 flex items-center justify-center gap-1 px-4 py-2 transition-all duration-300 ease-in-out hover:bg-gradient-to-r from-blue-400 to-pink-500 hover:text-white"
                                />
                            </a>
                        </div>
                    )}

                </nav>
            </header>
        </div>
    );
};

export default NavBar;
