// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { registerTypes as registerDotNetTypes } from '../common/dotnet/serviceRegistry';
import { INugetRepository } from '../common/nuget/types';
import { BANNER_NAME_PROPOSE_LS, IPythonExtensionBanner } from '../common/types';
import { IServiceManager } from '../ioc/types';
import { ProposePylanceBanner } from '../languageServices/proposeLanguageServerBanner';
import { AATesting } from './aaTesting';
import { ExtensionActivationManager } from './activationManager';
import { LanguageServerExtensionActivationService } from './activationService';
import { DownloadBetaChannelRule, DownloadDailyChannelRule } from './common/downloadChannelRules';
import { LanguageServerDownloader } from './common/downloader';
import { LanguageServerDownloadChannel } from './common/packageRepository';
import { ExtensionSurveyPrompt } from './extensionSurvey';
import { JediLanguageServerAnalysisOptions } from './jedi/analysisOptions';
import { JediLanguageClientFactory } from './jedi/languageClientFactory';
import { JediLanguageServerProxy } from './jedi/languageServerProxy';
import { JediLanguageServerManager } from './jedi/manager';
import { MultiplexingJediLanguageServerActivator } from './jedi/multiplexingActivator';
import { DotNetLanguageServerActivator } from './languageServer/activator';
import { DotNetLanguageServerAnalysisOptions } from './languageServer/analysisOptions';
import { DotNetLanguageClientFactory } from './languageServer/languageClientFactory';
import { LanguageServerCompatibilityService } from './languageServer/languageServerCompatibilityService';
import { LanguageServerExtension } from './languageServer/languageServerExtension';
import { DotNetLanguageServerFolderService } from './languageServer/languageServerFolderService';
import {
    BetaDotNetLanguageServerPackageRepository,
    DailyDotNetLanguageServerPackageRepository,
    StableDotNetLanguageServerPackageRepository,
} from './languageServer/languageServerPackageRepository';
import { DotNetLanguageServerPackageService } from './languageServer/languageServerPackageService';
import { DotNetLanguageServerProxy } from './languageServer/languageServerProxy';
import { DotNetLanguageServerManager } from './languageServer/manager';
import { LanguageServerOutputChannel } from './languageServer/outputChannel';
import { PlatformData } from './languageServer/platformData';
import { NodeLanguageServerActivator } from './node/activator';
import { NodeLanguageServerAnalysisOptions } from './node/analysisOptions';
import { NodeLanguageClientFactory } from './node/languageClientFactory';
import { NodeLanguageServerFolderService } from './node/languageServerFolderService';
import {
    BetaNodeLanguageServerPackageRepository,
    DailyNodeLanguageServerPackageRepository,
    StableNodeLanguageServerPackageRepository,
} from './node/languageServerPackageRepository';
import { NodeLanguageServerPackageService } from './node/languageServerPackageService';
import { NodeLanguageServerProxy } from './node/languageServerProxy';
import { NodeLanguageServerManager } from './node/manager';
import { NoLanguageServerExtensionActivator } from './none/activator';
import {
    IDownloadChannelRule,
    IExtensionActivationManager,
    IExtensionActivationService,
    IExtensionSingleActivationService,
    ILanguageClientFactory,
    ILanguageServerActivator,
    ILanguageServerAnalysisOptions,
    ILanguageServerCache,
    ILanguageServerCompatibilityService,
    ILanguageServerDownloader,
    ILanguageServerExtension,
    ILanguageServerFolderService,
    ILanguageServerManager,
    ILanguageServerOutputChannel,
    ILanguageServerPackageService,
    ILanguageServerProxy,
    IPlatformData,
    LanguageServerType,
} from './types';

export function registerTypes(serviceManager: IServiceManager, languageServerType: LanguageServerType) {
    serviceManager.addSingleton<ILanguageServerCache>(ILanguageServerCache, LanguageServerExtensionActivationService);
    serviceManager.addBinding(ILanguageServerCache, IExtensionActivationService);
    serviceManager.addSingleton<ILanguageServerExtension>(ILanguageServerExtension, LanguageServerExtension);
    serviceManager.add<IExtensionActivationManager>(IExtensionActivationManager, ExtensionActivationManager);

    serviceManager.addSingleton<IPythonExtensionBanner>(
        IPythonExtensionBanner,
        ProposePylanceBanner,
        BANNER_NAME_PROPOSE_LS,
    );

    if (languageServerType === LanguageServerType.Microsoft) {
        serviceManager.add<ILanguageServerAnalysisOptions>(
            ILanguageServerAnalysisOptions,
            DotNetLanguageServerAnalysisOptions,
            LanguageServerType.Microsoft,
        );
        serviceManager.add<ILanguageServerActivator>(
            ILanguageServerActivator,
            DotNetLanguageServerActivator,
            LanguageServerType.Microsoft,
        );
        serviceManager.addSingleton<INugetRepository>(
            INugetRepository,
            StableDotNetLanguageServerPackageRepository,
            LanguageServerDownloadChannel.stable,
        );
        serviceManager.addSingleton<INugetRepository>(
            INugetRepository,
            BetaDotNetLanguageServerPackageRepository,
            LanguageServerDownloadChannel.beta,
        );
        serviceManager.addSingleton<INugetRepository>(
            INugetRepository,
            DailyDotNetLanguageServerPackageRepository,
            LanguageServerDownloadChannel.daily,
        );
        serviceManager.addSingleton<ILanguageServerCompatibilityService>(
            ILanguageServerCompatibilityService,
            LanguageServerCompatibilityService,
        );
        serviceManager.addSingleton<ILanguageClientFactory>(ILanguageClientFactory, DotNetLanguageClientFactory);
        serviceManager.addSingleton<IPlatformData>(IPlatformData, PlatformData);
        serviceManager.add<ILanguageServerManager>(ILanguageServerManager, DotNetLanguageServerManager);
        serviceManager.add<ILanguageServerProxy>(ILanguageServerProxy, DotNetLanguageServerProxy);
        serviceManager.addSingleton<ILanguageServerFolderService>(
            ILanguageServerFolderService,
            DotNetLanguageServerFolderService,
        );
        serviceManager.addSingleton<ILanguageServerPackageService>(
            ILanguageServerPackageService,
            DotNetLanguageServerPackageService,
        );
        registerDotNetTypes(serviceManager);
    } else if (languageServerType === LanguageServerType.Node) {
        serviceManager.add<ILanguageServerAnalysisOptions>(
            ILanguageServerAnalysisOptions,
            NodeLanguageServerAnalysisOptions,
            LanguageServerType.Node,
        );
        serviceManager.add<ILanguageServerActivator>(
            ILanguageServerActivator,
            NodeLanguageServerActivator,
            LanguageServerType.Node,
        );
        serviceManager.addSingleton<INugetRepository>(
            INugetRepository,
            StableNodeLanguageServerPackageRepository,
            LanguageServerDownloadChannel.stable,
        );
        serviceManager.addSingleton<INugetRepository>(
            INugetRepository,
            BetaNodeLanguageServerPackageRepository,
            LanguageServerDownloadChannel.beta,
        );
        serviceManager.addSingleton<INugetRepository>(
            INugetRepository,
            DailyNodeLanguageServerPackageRepository,
            LanguageServerDownloadChannel.daily,
        );
        serviceManager.addSingleton<ILanguageClientFactory>(ILanguageClientFactory, NodeLanguageClientFactory);
        serviceManager.add<ILanguageServerManager>(ILanguageServerManager, NodeLanguageServerManager);
        serviceManager.add<ILanguageServerProxy>(ILanguageServerProxy, NodeLanguageServerProxy);
        serviceManager.addSingleton<ILanguageServerFolderService>(
            ILanguageServerFolderService,
            NodeLanguageServerFolderService,
        );
        serviceManager.addSingleton<ILanguageServerPackageService>(
            ILanguageServerPackageService,
            NodeLanguageServerPackageService,
        );
    } else if (languageServerType === LanguageServerType.Jedi) {
        serviceManager.add<ILanguageServerActivator>(
            ILanguageServerActivator,
            MultiplexingJediLanguageServerActivator,
            LanguageServerType.Jedi,
        );

        // Note: These other services are required when using the Jedi LSP.
        serviceManager.add<ILanguageServerAnalysisOptions>(
            ILanguageServerAnalysisOptions,
            JediLanguageServerAnalysisOptions,
            LanguageServerType.Jedi,
        );
        serviceManager.addSingleton<ILanguageClientFactory>(ILanguageClientFactory, JediLanguageClientFactory);
        serviceManager.add<ILanguageServerManager>(ILanguageServerManager, JediLanguageServerManager);
        serviceManager.add<ILanguageServerProxy>(ILanguageServerProxy, JediLanguageServerProxy);
    } else if (languageServerType === LanguageServerType.None) {
        serviceManager.add<ILanguageServerActivator>(
            ILanguageServerActivator,
            NoLanguageServerExtensionActivator,
            LanguageServerType.None,
        );
    }

    serviceManager.addSingleton<IDownloadChannelRule>(
        IDownloadChannelRule,
        DownloadDailyChannelRule,
        LanguageServerDownloadChannel.daily,
    );
    serviceManager.addSingleton<IDownloadChannelRule>(
        IDownloadChannelRule,
        DownloadBetaChannelRule,
        LanguageServerDownloadChannel.beta,
    );
    serviceManager.addSingleton<IDownloadChannelRule>(
        IDownloadChannelRule,
        DownloadBetaChannelRule,
        LanguageServerDownloadChannel.stable,
    );
    serviceManager.addSingleton<ILanguageServerDownloader>(ILanguageServerDownloader, LanguageServerDownloader);

    serviceManager.addSingleton<ILanguageServerOutputChannel>(
        ILanguageServerOutputChannel,
        LanguageServerOutputChannel,
    );
    serviceManager.addSingleton<IExtensionSingleActivationService>(
        IExtensionSingleActivationService,
        ExtensionSurveyPrompt,
    );
    serviceManager.addSingleton<IExtensionSingleActivationService>(IExtensionSingleActivationService, AATesting);
}
