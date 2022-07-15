//@vitest-environment jsdom
import React from "react";
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import App from "../App";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../main";
import AuthenticatedApp from "../AuthenticatedApp";
import { currentUser } from "../../firebase-config";
import { vi } from "vitest";

test('should render the Unauthenticated app if no user is logged in', async () => { 

    render(<QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>);
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
    
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument()

    screen.debug()
})
test('Authenticated app', async () => { 

    vi.mock('../../firebase-config"', () => {
        return {
          currentUser: vi.fn(()=>{email: 'email@test.com'}),
        }
      })
    console.log(currentUser)

    render(<AuthenticatedApp/>);
})

