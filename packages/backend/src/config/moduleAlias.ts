import path from "path";
import moduleAlias from "module-alias";

moduleAlias.addAliases({
  "@": path.join(__dirname, ".."),
  "~shared": path.join(__dirname, "..", "..", "..", "shared", "src"),
});

moduleAlias();
