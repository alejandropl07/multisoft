import { useState } from "react";
import img1 from "../../public/assets/img/blog/blog-post-1.jpg";
import img2 from "../../public/assets/img/blog/blog-post-2.jpg";
import img3 from "../../public/assets/img/blog/blog-post-3.jpg";
import img4 from "../../public/assets/img/blog/blog-post-4.jpg";
import img5 from "../../public/assets/img/blog/blog-post-5.jpg";
import img6 from "../../public/assets/img/blog/blog-post-6.jpg";

const AllBlogData = () => {
  const blogsData = [
    {
      id: 1,
      img: img1,
      title: "How to Own Your Audience by Creating an Email List",
      commentor: "Rio ",
      date: "21 April 2022",
      tag: `wordpress, business, economy, design`,
      description1:
        "Tomfoolery crikey bits and bobs brilliant bamboozled down the pub amongst brolly hanky panky, cack bonnet arse over tit burke bugger all mate bodge. cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Suspendisse interdum consectetur libero id faucibu nisl. Lacus vel facilisis volutpat est velit egestas.",
      description2:
        "Most photographers find it hard to see interesting pictures in places in which they are most familiar. A trip somewhere new seems always exactly what our photography needed, as shooting away from home consistently inspires us to new artistic heights. ",
      description3:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
      description4:
        "Riosum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 2,
      img: img2,
      title: "Top 10 Toolkits for Deep Learning in 2022",
      commentor: "Santhan ",
      date: "14 January 2022",
      tag: `wordpress, business, economy, design`,
      description1:
        "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      description2:
        "If you’ve been waiting for an invitation, this calligraphy is it. Commissioned by Notebook hand-lettered design for a poster. Quote is Notebook Building 8 VP’s Regina Dugan—and mine. ",
      description3:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
      description4:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  const [singleData, setSingleData] = useState({
    id: 0,
    img: 'path/to/default.jpg',
    title: '',
    commentor: '',
    date: '',
    tag: '',
    description1: '',
    description2: '',
    description3: '',
    description4: ''
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleBlogsData = (id:any) => {
    const find = blogsData.find((item) => item?.id === id);
    if (find) {
      setSingleData({
        id: find.id,
        img: find.img.src || '', // Asegúrate de convertir StaticImageData a string
        title: find.title,
        commentor: find.commentor,
        date: find.date,
        tag: find.tag,
        description1: find.description1,
        description2: find.description2,
        description3: find.description3,
        description4: find.description4
      });
    }
    setIsOpen(true);
  };

  return {
    singleData,
    isOpen,
    setIsOpen,
    blogsData,
    handleBlogsData,
  };
};

export default AllBlogData;
