while true; do
case "$1" in
    # -i|--install
	-i|--install) MSG='Install Project '$2; shift
	    echo "$MSG"
        # $1 = repo url. eg: https://github.com/yosefkurniawan/swift-pwa-custom.git
        # $2 = project name in the repo url. eg: swift-pwa-custom
        
        # reset root pwa repo
        rm pages/*
        rm public/*
        rm patches/*
        git checkout pages/ public/ patches/

        # install project repo
        mkdir -p project
        rm -rf src swift.config.js .env
        git clone $2 project/$3
        
        # copy files
        cp -rf project/$3/* .
        ;;

     # -s|--sync
	-s|--sync) MSG='Sync Project Files '$2; shift
	    echo "$MSG"
        
        # reset root pwa repo
        rm pages/*
        rm public/*
        rm patches/*
        git checkout pages/ public/ patches/
        rm -rf src swift.config.js .env
        
        # copy files
        cp -rf project/*/* .
        ;;
    
    # -p|--patch
	-p|--patch) MSG='Apply patches '$2; shift
	    echo "$MSG"
        
        ;;
    
    # --help
	-h|--help) shift
		printf "\n"
		printf "Example usage:\n\n"
		printf "Install Project:\n"
		printf "  bash project.sh -i|--info [project git repo url] [project name]\n"
        printf "  Your project will be stored in project/[project name]\n\n"
		printf "Sync Files:\n"
		printf "  bash project.sh -s|--sync\n"
		printf "  Use this command to sync/apply every changes on your project\n\n"
		exit 0 ;;
    --) shift; break ;;
    *) echo "Try -h for example usage."; exit 1 ;;
esac
done