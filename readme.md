![Logo](./assets/logo.png)

[![Npm package](https://img.shields.io/npm/v/saborter-react?color=red&label=npm%20package)](https://www.npmjs.com/package/saborter-react)
[![License](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)
[![Github](https://img.shields.io/badge/repository-github-color)](https://github.com/TENSIILE/saborter-react)

A library for canceling asynchronous requests that combines the `Saborter` library and `React`.

## 📚 Documentation

The documentation is divided into several sections:

- [Installation](#📦-installation)
- [Possibilities](#📖-possibilities)
- [Quick Start](#🚀-quick-start)
- [API](#🔧-api)
- [Usage Examples](#🎯-usage-examples)
- [License](#📄-license)

## 📦 Installation

```bash
npm install @saborter/react
# or
yarn add @saborter/react
```

## 📖 Possibilities

- The `aborter` field always has the same reference to the `Aborter` instance.
- Automatically abort the request when the component is unmounted.
- Automatically unsubscribe from all listeners when the component is unmounted.

## 🚀 Quick Start

### Basic Usage

```javascript
import { useAborter } from '@saborter/react';

const Component = () => {
  // Create an Aborter instance via the hook
  const { aborter } = useAborter();

  // Use for the request
  const fetchData = async () => {
    try {
      const data = await aborter.try((signal) => fetch('/api/data', { signal }));
      console.log('Data received:', data);
    } catch (error) {
      console.error('Request error:', error);
    }
  };
};
```

## 🔧 API

### `useAborter`

#### Props

```typescript
const { aborter } = new useAborter(props?: UseAborterProps);
```

#### Props Parameters

| Parameter | Type              | Description                   | Required |
| --------- | ----------------- | ----------------------------- | -------- |
| `props`   | `UseAborterProps` | Aborter configuration options | No       |

**UseAborterProps:**

```typescript
{
  /**
    Callback function for abort events.
    Associated with EventListener.onabort.
    It can be overridden via `aborter.listeners.onabort`
  */
  onAbort?: OnAbortCallback;

  /**
    A function called when the request state changes.
    It takes the new state as an argument.
    Can be overridden via `aborter.listeners.state.onstatechange`
  */
  onStateChange?: OnStateChangeCallback;

  /**
    A flag responsible for releasing resources.
    This includes unsubscribing, clearing fields, and removing references to passed callback functions.
    @default true
  */
  isDisposeEnabled?: boolean;
}
```

#### Properties

`aborter: Aborter`

Returns the `Aborter` instance.

```javascript
const { aborter } = useAborter();

// Using signal in the request
fetch('/api/data', {
  signal: aborter.signal
});
```

`requestState: RequestState`

The current value of the request's state. May be undefined if the state has not yet been set.

The field is a `react` state associated with the `aborter.listeners.state.value` field.

[Detailed documentation here](https://github.com/TENSIILE/saborter/blob/develop/docs/state-observer.md)

```javascript
const { requestState } = useAborter();

console.log(requestState); // cancelled / pending / fulfilled / rejected / aborted
```

## 🎯 Usage Examples

### Basic Usage

```javascript
import { useState } from 'react';
import { AbortError } from 'saborter';
import { useAborter } from '@saborter/react';

const Component = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Create an Aborter instance via the hook
  const { aborter } = useAborter();

  // Use for the request
  const fetchData = async () => {
    try {
      setLoading(true);

      const user = await aborter.try((signal) => fetch('/api/user', { signal }));

      setUser(user);
    } catch (error) {
      if (error instanceof AbortError) {
        // An abort error will occur either when the `aborter.abort()` method is called or when the component is unmounted.
        console.error('Abort error:', error);
      }
      console.error('Request error:', error);
    } finally {
      setLoading(false);
    }
  };

  return <h1>{loading ? 'Loading...' : user.fullname}</h1>;
};
```

### The `AbortError` `initiator` changed while unmounting the component.

```javascript
import { AbortError } from 'saborter';
import { useAborter } from '@saborter/react';

const Component = () => {
  const { aborter } = useAborter();

  const fetchData = async () => {
    try {
      const user = await aborter.try((signal) => fetch('/api/user', { signal }));
    } catch (error) {
      if (error instanceof AbortError) {
        console.error('Abort error initiator:', error.initiator); // 'component-unmounted';
      }
    }
  };
};
```

## 📋 License

MIT License - see [LICENSE](./LICENSE) for details.
