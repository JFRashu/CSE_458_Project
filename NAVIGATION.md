# Navigation System

This app uses a custom navigation system built on top of React for client-side routing.

## Basic Usage

### Using the `useNavigate` Hook

```jsx
import { useNavigate } from '../utils/navigation';

const MyComponent = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard');
  };

  return (
    <button onClick={handleClick}>
      Go to Dashboard
    </button>
  );
};
```

### Navigation Options

```jsx
// Basic navigation
navigate('/path');

// Replace current history entry (no back button)
navigate('/path', { replace: true });

// Pass state data
navigate('/path', {
  state: { userId: 123, from: 'home' }
});

// Navigate with both options
navigate('/path', {
  replace: true,
  state: { data: 'example' }
});
```

### Navigation Utilities

```jsx
import { navigationUtils } from '../utils/navigation';

// Go to path
navigationUtils.goTo(navigate, '/dashboard');

// Go back in history
navigationUtils.goBack();

// Go forward in history
navigationUtils.goForward();

// Replace current entry
navigationUtils.replace(navigate, '/new-path');

// Navigate with state
navigationUtils.goToWithState(navigate, '/path', { data: 'value' });

// Get state from previous navigation
const state = navigationUtils.getState('/path');
```

## Route Parameters

The router supports dynamic routes with parameters:

```jsx
// In App.jsx
<Route path="/user/:id" component={UserPage} />

// In UserPage.jsx
const UserPage = ({ routeParams }) => {
  const { id } = routeParams;
  return <div>User ID: {id}</div>;
};
```

## Programmatic Navigation

```jsx
// Navigate after form submission
const handleSubmit = async (formData) => {
  try {
    await submitForm(formData);
    navigate('/success', {
      state: { message: 'Form submitted successfully!' }
    });
  } catch (error) {
    navigate('/error', {
      state: { error: error.message }
    });
  }
};

// Conditional navigation
const handleAuthCheck = () => {
  if (isAuthenticated) {
    navigate('/dashboard');
  } else {
    navigate('/login', {
      state: { redirectTo: '/dashboard' }
    });
  }
};
```

## Browser History Integration

The navigation system integrates with browser history:

- **Back/Forward buttons** work correctly
- **URL updates** reflect current route
- **Page refresh** maintains current route
- **Direct URL access** works for all routes

## Best Practices

1. **Use the hook** in functional components: `const navigate = useNavigate();`
2. **Pass state** for complex navigation scenarios
3. **Use replace** for redirects and form submissions
4. **Handle loading states** during navigation
5. **Validate routes** before navigation

## Examples in the App

- **HomePage**: Uses `useNavigate` hook for emotion selection
- **Navbar**: Uses navigate prop for menu items
- **Auth pages**: Navigate to dashboard after successful login/register
- **Dashboard**: Navigate back to home for emotion check-ins</content>
<parameter name="filePath">e:\mobile\LEVEL 4 TERM 2\CSE 458\Project\mental-health-app\NAVIGATION.md