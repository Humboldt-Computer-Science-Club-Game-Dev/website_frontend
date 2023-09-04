import { useEffect } from "react";
function DiscordInvite({ discordInvite }: any) {
  useEffect(() => {
    window.location.href = discordInvite;
  }, []);
  return <>Hello. In DiscordInvite component</>;
}

export default DiscordInvite;
