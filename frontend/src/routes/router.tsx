import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../Components/Layouts/MainLayout";
import About from "../Components/Pages/About/About";
import Home from "../Components/Pages/Home/Home";
import NotFound from "../Components/Pages/NotFound";
import PlaceholderPage from "../Components/Pages/PlaceholderPage";
import Portfolio from "../Components/Pages/Portfolio/Portfolio";
import Speaking from "../Components/Pages/Speaking/Speaking";
import TheNextLevel from "../Components/Pages/TheNextLevel/TheNextLevel";
import Book from "../Components/Pages/Book/Book";
import LatestUpdates from "../Components/Pages/LatestUpdates/LatestUpdates";
import UpdateDetail from "../Components/Pages/LatestUpdates/UpdateDetail";
import Contact from "../Components/Pages/Contact/Contact";
import LevelOne from "../Components/Pages/TheNextLevel/Level1/LevelOne";
import LevelTwo from "../Components/Pages/TheNextLevel/Level2/LevelTwo";
import LevelThree from "../Components/Pages/TheNextLevel/Level3/LevelThree";
import SecretLevel from "../Components/Pages/TheNextLevel/SecretLevel/SecretLevel";
import UsaBook from "../Components/Pages/Book/UsaBook/UsaBook";
import SouthEastAsia from "../Components/Pages/Book/SouthEastAsia/SouthEastAsia";
import China from "../Components/Pages/Book/China/China";
import UAE from "../Components/Pages/Book/UAE/UAE";
import WashPlus from "../Components/Pages/WashPlus/WashPlus";
import JustEat from "../Components/Pages/JustEat/JustEat";
import FareExchange from "../Components/Pages/FareExchange/FareExchange";
import Uhubs from "../Components/Pages/Uhubs/Uhubs";
import Advisory from "../Components/Pages/Advisory/Advisory";
import Impact from "../Components/Pages/Impact/Impact";
import MalaySiaAndSEA from "../Components/Pages/MalaysiaAndSEA/MalaySiaAndSEA";
import Workshops from "../Components/Pages/Workshops/Workshops";


const placeholder = (path: string, title: string) => ({
  path,
  element: <PlaceholderPage title={title} />,
});

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },

     {path: "portfolio", element: <Portfolio />},
      { path: "speaking", element: <Speaking /> },
      { path: "the-next-level", element: <TheNextLevel /> },
      // {path: "book", element: <Book />},
      {path: "/unfair-advantage", element: <Book />},
      {path: "updates", element: <LatestUpdates />},
      { path: "updates/:slug", element: <UpdateDetail /> },
      { path: "contact", element: <Contact /> },
      {path: "the-next-level/level-1", element: <LevelOne />},
      {path: "the-next-level/level-2", element: <LevelTwo />},
      {path: "the-next-level/level-3", element: <LevelThree />},
      {path: "the-next-level/secret-level", element: <SecretLevel />},
      {
        path: "book/usa-book",  
        element: <UsaBook/>,
      },
      {
        path: "book/southeast-asia-book",  
        element: <SouthEastAsia/>,
      },
      {
path: "book/china-book",
element: <China />,
      }
,
{
path: "/impact",
element: <Impact/>,
},
{
path: "/malaysia-sea",
element: <MalaySiaAndSEA/>,
},
{
path: "book/uae-book",
element: <UAE/>,
},
{
path: "portfolio/wash-plus",
element: <WashPlus/>,
},
{
path: "portfolio/just-eat",
element: <JustEat/>
},
{
path: "portfolio/fare-exchange",
element:<FareExchange/>
},
{
path: "/advisory",
element: <Advisory/>,
},
{
path: "portfolio/uhubs",
element:<Uhubs/>
},
{
path: "workshops",
element: <Workshops/>
},
      // placeholder("workshops", "Workshops"),
      placeholder("results-media", "Results & Media"),
      placeholder("investment", "Investment"),
      placeholder("podcast", "Podcast"),
      placeholder("radio-show", "Radio Show"),
      placeholder("faq", "FAQ"),
      placeholder("blog", "Blog"),
      placeholder("privacy", "Privacy"),
      placeholder("terms", "Terms & Condition"),
      placeholder("quotes", "Quotes"),
      placeholder("media", "Media"),

      { path: "*", element: <NotFound /> },
    ],
  },
]);
