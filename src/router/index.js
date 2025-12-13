import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import ContactView from '@/views/ContactView.vue'
import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUpView.vue'
import AccountView from '@/views/AccountView.vue'
import OrdersView from '@/views/OrdersView.vue'
import CancellationsView from '@/views/CancellationsView.vue'
import ReviewsView from '@/views/ReviewsView.vue'
import AboutView from '@/views/AboutView.vue'
import CartView from '@/views/CartView.vue'
import WishlistView from '@/views/WishlistView.vue'
import CheckoutView from '@/views/CheckoutView.vue'
import PaymentView from '@/views/PaymentView.vue'
import PaymentSuccessView from '@/views/PaymentSuccessView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import ProductReviewsView from '@/views/ProductReviewsView.vue'
import AllProductsView from '@/views/AllProductsView.vue'
import AboutMeView from '@/views/AboutMeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
    },

    // ==== ROUTE DARI DROPDOWN ACCOUNT ====
    {
      path: '/account',
      name: 'account',
      component: AccountView,
    },
    {
      path: '/orders',
      name: 'orders',
      component: OrdersView,
    },
    {
      path: '/products/:id',
      name: 'product-detail',
      component: ProductDetailView,
    },
    {
      path: '/products/:id/reviews',
      name: 'product-reviews',
      component: ProductReviewsView,
    },
    {
      path: '/products',
      name: 'all-products',
      component: AllProductsView,
    },
    {
      path: '/cancellations',
      name: 'cancellations',
      component: CancellationsView,
    },
    {
      path: '/reviews',
      name: 'reviews',
      component: ReviewsView,
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: WishlistView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/aboutme',
      name: 'aboutme',
      component: AboutMeView,
    },

    // Cart
    {
      path: '/cart',
      name: 'cart',
      component: CartView
    },

    // Checkout
    { path: '/checkout',
      name: 'checkout',
      component: CheckoutView
    },

    // Payment
    { path: '/payment',
      name: 'payment',
      component: PaymentView
    },

    { path: '/payment-success',
      name: 'payment-success',
      component: PaymentSuccessView
    }
  ],
})

export default router
