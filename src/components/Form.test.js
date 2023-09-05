import { render, screen } from "@testing-library/react";
import { Form } from "./Form";
import user from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("Form test", () => {
  const onSubmit = jest.fn();

  beforeEach(() => {
    onSubmit.mockClear();
    render(<Form onSubmit={onSubmit} />);
  });

  it("onSubmit is called when all fields pass validation", () => {
    act(() => {
      setForm("Bruno", "Alba", "bruno@gmail.com", "This is a message");
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it("onSubmit is not called with empty first name", () => {
    act(() => {
      setForm("", "Alba", "bruno@gmail.com", "This is a message");
      expect(onSubmit).toHaveBeenCalledTimes(0);
    });
  });

  it("onSubmit is not called with empty last name", () => {
    act(() => {
      setForm("Bruno", "", "bruno@gmail.com", "This is a message");
      expect(onSubmit).toHaveBeenCalledTimes(0);
    });
  });

  it("onSubmit is not called with wrong email", () => {
    act(() => {
      setForm("Bruno", "Alba", "bruno@gmail", "This is a message");
      expect(onSubmit).toHaveBeenCalledTimes(0);
    });
  });

  it("onSubmit is not called with wrong message shorten than 10 characters", () => {
    act(() => {
      setForm("Bruno", "Alba", "bruno@gmail", "message");
      expect(onSubmit).toHaveBeenCalledTimes(0);
    });
  });
});

const setForm = (firstName, lastName, email, message) => {
  user.type(getFirstName(), firstName);
  user.type(getLastName(), lastName);
  user.type(getEmail(), email);
  user.type(getMessage(), message);
  user.click(screen.getByRole("button", { name: /Submit/i }));
};

const getFirstName = () => {
  return screen.getByRole("textbox", {
    name: /first name/i,
  });
};

const getLastName = () => {
  return screen.getByRole("textbox", {
    name: /last name/i,
  });
};

const getEmail = () => {
  return screen.getByRole("textbox", {
    name: /email/i,
  });
};

const getMessage = () => {
  return screen.getByRole("textbox", {
    name: /message/i,
  });
};
