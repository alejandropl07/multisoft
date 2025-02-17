"use client";
import { FC } from 'react';
import { BsTwitterX, BsFacebook, BsDribbble, BsInstagram, BsYoutube } from "react-icons/bs";

// ========================================================
type SocialLinksProps = { className?: string };
// ========================================================

const links = [
  { id: 1, icon: BsTwitterX, url: 'https://twitter.com/uilibofficial' },
  { id: 2, icon: BsFacebook, url: 'https://facebook.com/uiLibOfficial/' },
  { id: 3, icon: BsDribbble, url: '#' },
  { id: 4, icon: BsInstagram, url: 'https://www.instagram.com/uilibofficial/' },
  { id: 5, icon: BsYoutube, url: 'https://www.youtube.com/channel/UCsIyD-TSO1wQFz-n2Y4i3Rg' }
];

const SocialLinks: FC<SocialLinksProps> = ({ className = 'nav social social-white mt-4' }) => {
  return (
    <nav className={className}>
      {links.map(({ id, icon: Icon, url }) => (
        <a href={url} key={id} target="_blank" rel="noreferrer">
          <Icon />
        </a>
      ))}
    </nav>
  );
};

export default SocialLinks;
