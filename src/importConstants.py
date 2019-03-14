#! /usr/bin/env python3

import json
from requests_html import HTMLSession
from textwrap import TextWrapper

jstemplate = """

export const KEYWORD_PATHS = {
  EAI: "/ecosystem-alignment-incentive-eai"
}

export const KEYWORDS = {
  EAI: `Ecosystem Alignment Incentive (EAI) is ndau you can earn by locking
  one of your existing ndau accounts for a specific period of time.
  You can’t withdraw your ndau while an account is locked, and longer lock periods
   will let you earn more EAI.`
}
"""


class Keywords(object):
    def __init__(self, filename):
        self.filename = filename
        self.session = HTMLSession()
        self.keywords = dict()

        f = open(self.filename)
        data = json.load(f)
        self.base_endpoint = data["base_endpoint"]
        for k in data["keywords"]:
            self.keywords[k] = dict(path=data["keywords"][k])

    def loadAll(self):
        for kwd in self.keywords:
            print(f"loading {kwd}")
            self.loadOne(kwd)

    def loadOne(self, kwd):
        # we need to end the path with / to make wordpress happy
        p = self.base_endpoint + self.keywords[kwd]["path"] + "/"
        r = self.session.get(p)

        kbentry = r.html.find(".hkb-article__content", first=True)
        em = kbentry.find("em", first=True)
        self.keywords[kwd]["text"] = em.text

    def getBase(self):
        return self.base_endpoint

    def getKeywords(self):
        return self.keywords.keys()

    def getText(self, kwd):
        return self.keywords[kwd]["text"]


def writeOutput(filename, kwds):
    tw = TextWrapper(width=70, subsequent_indent="        ")
    f = open(filename, "w")
    print(f'export const KNOWLEDGE_BASE_ENDPOINT = "{kwds.getBase()}"', file=f)
    print("export const KEYWORDS = {", file=f)
    for k in kwds.getKeywords():
        text = kwds.getText(k)
        print(text)
        wrapped = tw.fill(text)
        print(wrapped)
        print(f"    {k}: `{wrapped}`", file=f)
    print("}", file=f)
    f.close()


if __name__ == "__main__":
    kwds = Keywords("keywords.json")
    kwds.loadAll()
    print("loaded")
    outf = "keywords.js"
    writeOutput(outf, kwds)
    print(f"{outf} created")
