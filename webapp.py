from flask import Flask, render_template, Markup
import os
import markdown #as md

app = Flask(__name__)

md = markdown.Markdown(extensions=['mdx_math'])


@app.route("/episode/<string:episode>")
def serve_episode(episode):

    content = []
    content_folder = os.path.join(os.getcwd(), 'content', episode)
    with os.scandir(content_folder) as folder:
        for file in folder:
            if file.is_file() and file.name.endswith(".md"):
                with open(file) as f:
                    content.append(Markup(md.convert(f.read())))
                    # content.append(Markup(md.markdown(f.read())))

    # print()
    # print(content[0])
    # print()

    return render_template("/"+episode+".html", content=content)


if __name__ == "__main__":
    app.run(debug=True)



