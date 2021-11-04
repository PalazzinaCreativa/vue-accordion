
new-patch:
	npm i; \
	npm run build; \
	git add .; \
	git commit -m "new patch"; \
	git push -u origin master; \
	npm version patch --no-git-tag-version; \
	npm publish