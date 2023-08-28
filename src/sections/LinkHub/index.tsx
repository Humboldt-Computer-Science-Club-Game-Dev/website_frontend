import "./style.scss";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

function LinkHub({
  title,
  footer,
  linkItem1,
  linkItem2,
  linkItem3,
  linkItem4,
  social1,
  social2,
  social3,
}: any) {
  const isTiny = useMediaQuery({ query: "(max-width: 375px)" });
  useEffect(() => {
    const root = document.querySelector("#root");
    root?.classList.add("no_scroll");
    root?.classList.add("shrink_height");

    return () => {
      root?.classList.remove("no_scroll");
      root?.classList.remove("shrink_height");
    };
  }, []);
  return (
    <div className="link_hub_container">
      <img
        className="background"
        src="https://cdn.sanity.io/images/cat1ymme/production/261d3b076599664768bed3d4b7f34f29cf209a0d-1920x1080.png?w=1000&h=1000&fit=max"
      />
      <div className="inner_content">
        <img
          className="profile_photo"
          src="https://cdn.sanity.io/images/cat1ymme/production/bf00b8ea6435077c3f8eee99fa5436f2e5c42768-365x365.jpg?w=1000&h=1000&fit=max"
          alt="profile photo"
        />
        <h1>{title}</h1>
        <section className="socials_row">
          <a href={social1.href}>
            <img src={social1.thumbnail} alt="social icon" />
          </a>
          <a href={social2.href}>
            <img src={social2.thumbnail} alt="social icon" />
          </a>
          <a href={social3.href}>
            <img src={social3.thumbnail} alt="social icon" />
          </a>
        </section>
        <button className="link_row" onClick={linkItem1.onClick}>
          {!isTiny ? (
            <img className="thumbnail" src={linkItem1.thumbnail} />
          ) : (
            <></>
          )}
          <p>{linkItem1.title}</p>
        </button>
        <button className="link_row" onClick={linkItem2.onClick}>
          {!isTiny ? (
            <img className="thumbnail" src={linkItem2.thumbnail} />
          ) : (
            <></>
          )}
          <p>{linkItem2.title}</p>
        </button>
        <button className="link_row" onClick={linkItem3.onClick}>
          {!isTiny ? (
            <img className="thumbnail" src={linkItem3.thumbnail} />
          ) : (
            <></>
          )}
          <p>{linkItem3.title}</p>
        </button>
        <button className="link_row" onClick={linkItem4.onClick}>
          {!isTiny ? (
            <img className="thumbnail" src={linkItem4.thumbnail} />
          ) : (
            <></>
          )}
          <p>{linkItem4.title}</p>
        </button>
        <FooterButton {...footer} />
      </div>
    </div>
  );
}

function FooterButton({ onClick, title }: any) {
  return (
    <button onClick={onClick} className="footer">
      {title}
    </button>
  );
}

export default LinkHub;
