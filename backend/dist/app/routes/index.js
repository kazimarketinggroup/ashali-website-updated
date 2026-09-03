"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/Auth/auth.route");
const url_route_1 = require("../modules/Url/url.route");
const contact_route_1 = require("../modules/Contact/contact.route");
const newsletter_route_1 = require("../modules/Newsletter/newsletter.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/urls',
        route: url_route_1.UrlRoutes
    },
    {
        path: '/contact',
        route: contact_route_1.ContactRoutes
    },
    {
        path: '/newsletter',
        route: newsletter_route_1.NewsletterRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
