# context

React Context providers for state that needs to be shared across many
components without prop-drilling — e.g. a future `AuthContext` or
`ThemeContext`.

Nothing lives here yet, and none is needed until a real cross-cutting
piece of state exists. Prefer plain React state in a component first;
only reach for Context when several unrelated components genuinely need
the same data.
