import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import "@testing-library/jest-dom/extend-expect"

describe('Testing the component', () => {

    test("show data content when component is first rendered  ", () => {
        render(<App />)
        const heading = screen.getByRole('heading', {
            name: /photosnap/i
          })
        expect(heading).toBeInTheDocument();
        const link = screen.getByRole('link', {
            name: /senior frontend developer/i
        })
        expect(link).toBeInTheDocument();
    })

    test("shows related text when the button is clicked ", () => {
        render(<App />)
        const a = screen.getAllByRole('button', { name: /Frontend/i })[0];
        fireEvent.click(a);
        const text = screen.getAllByText(/Frontend/i)[0]; 
        expect(text).toBeInTheDocument();
        const senior = screen.getAllByRole('button', { name: /Senior/i })[0];
        fireEvent.click(senior);
        const senior_text = screen.getAllByText(/Senior/i)[0]; 
        expect(senior_text).toBeInTheDocument();
    })
    
    test("shows Clear button any role is clicked ", () => {
        render(<App />)
        const role = screen.getAllByRole('button', { name: /Senior/i })[0];
        fireEvent.click(role);
        const text = screen.getByText(/Clear/i); 
        expect(text).toBeInTheDocument();
    })
    
    test("Clears the data array when clear buttons clicked ", () => {
        render(<App />)
        const role = screen.getAllByRole('button', { name: /Senior/i })[0];
        fireEvent.click(role);
        const text = screen.getByText(/Clear/i); 
        fireEvent.click(text);
        expect(text).not.toBeInTheDocument();
   })
})

