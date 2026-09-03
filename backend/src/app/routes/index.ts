import  { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UrlRoutes } from '../modules/Url/url.route';
import { ContactRoutes } from '../modules/Contact/contact.route';
import { NewsletterRoutes } from '../modules/Newsletter/newsletter.route';




const router = Router();

const moduleRoutes = [

  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path :'/urls',
    route:UrlRoutes
  },
  {
    path: '/contact',
    route:ContactRoutes
  },
  {
    path: '/newsletter',
    route: NewsletterRoutes,
  },


];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;