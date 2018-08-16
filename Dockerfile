FROM microsoft/dotnet:sdk

# Install NPM and Azure Functions Core Tools
RUN apt-get -yqq update && \
    apt-get install -yq curl && \
    curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
    apt-get install -yq nodejs build-essential && \
    npm install -g npm && \
    npm install -g azure-functions-core-tools@core --unsafe-perm=true --allow-root
