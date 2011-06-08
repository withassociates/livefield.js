desc "Copy documentation from library file to README.md"
task :readme do
  lib_path = File.expand_path "../src/livefield.js", __FILE__
  readme_path = File.expand_path "../README.md", __FILE__
  readme = []
  File.open lib_path, "r" do |f|
    while !(line = f.gets).include?("*/")
      line = line.sub /^[ \/]*\*+ ?/, ""
      readme << line unless line == ""
    end
  end
  File.open readme_path, "w" do |f|
    f << readme.join.strip
  end
end
