# PageContext

Reusable context provider managing preloaders, image preloading, and data fetching explicitly per page.

## 🚩 Usage explicitly:

```tsx
<PageContextProvider
  endpoints={["home", "works"]}
  preloader={<YourPreloader />}
  timeoutDuration={3000}>
  <YourPageComponent />
</PageContextProvider>
```
