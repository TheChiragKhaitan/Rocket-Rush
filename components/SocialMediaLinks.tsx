'use client'
import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MdEmail } from "react-icons/md";

const SocialMediaLinks = () => {
    return (
        <div className='flex flex-row text-3xl gap-4 items-center'>
            <div className='flex flex-row gap-4 items-center'>
                <a href="https://github.com/TheChiragKhaitan" className="hover:scale-125 transition-all duration-200"  target="_blank" title='Github' rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGithub} />
                </a>
                <a href="https://www.linkedin.com/in/chirag-khaitan" className="hover:scale-125 transition-all duration-200"  target="_blank" title='LinkedIn' rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a href="https://www.instagram.com/thechiragkhaitan" className="hover:scale-125 transition-all duration-200"  target="_blank" title='Instagram' rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="mailto:chiragkhaitan2014@gmail.com" className="hover:scale-125 transition-all duration-200" target="_blank" title='Email' rel="noopener noreferrer">
                    <MdEmail />
                </a>
            </div>
        </div>
    );
};

export default SocialMediaLinks;